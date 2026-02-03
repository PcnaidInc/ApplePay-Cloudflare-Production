import { Hono } from 'hono';
import { setCookie, getCookie, deleteCookie } from 'hono/cookie';
import { cors } from 'hono/cors';

import {
  buildShopifyAuthorizeUrl,
  exchangeAccessToken,
  getShopInfo,
  isValidShopDomain,
  registerAppUninstalledWebhook,
} from './lib/shopify';
import {
  verifyShopifyHmac,
  verifyShopifyWebhookHmac,
} from './lib/shopifyHmac';
import { verifyShopifySessionToken } from './lib/shopifySessionToken';
import {
  createPaymentSession,
  getMerchantDetails,
  registerMerchant,
  unregisterMerchant,
} from './lib/apple';
import {
  createCustomHostname,
  deleteCustomHostname,
  findCustomHostname,
} from './lib/cloudflare';
import {
  getMerchantDomainByDomain,
  getMerchantDomainByShop,
  getMerchantDomainsByShop,
  getShopByShop,
  logWebhookEvent,
  markShopUninstalled,
  upsertMerchantDomain,
  upsertShop,
  updateMerchantDomainAppleStatus,
  updateMerchantDomainCloudflareStatus,
  type MerchantDomainRow,
} from './lib/db';
import {
  nowIso,
  randomState,
  sha256Hex,
} from './lib/util';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type Fetcher = {
  fetch(input: URL | RequestInfo, init?: RequestInit): Promise<Response>;
};

type Env = {
  // Storage
  DB: D1Database;
  APPLEPAY_KV: KVNamespace;

  // Static assets (built admin-ui)
  ASSETS: Fetcher;

  // Outbound mTLS to Apple (configured in wrangler via mtls_certificates)
  APPLE_MTLS: Fetcher;

  // Shopify
  SHOPIFY_API_KEY: string;
  SHOPIFY_API_SECRET: string;
  SHOPIFY_API_VERSION: string;
  SHOPIFY_SCOPES: string;
  SHOPIFY_APP_URL: string;

  // Cloudflare for SaaS (Custom Hostnames)
  CF_API_TOKEN: string;
  CF_ZONE_ID: string;
  CF_SAAS_CNAME_TARGET: string;

  // Apple Pay (Web Merchant Registration API)
  APPLE_ENV: 'production' | 'sandbox';
  APPLE_ENCRYPT_TO: string;
  APPLE_USE_JWT: 'true' | 'false';
  APPLE_JWT_CERT_PEM: string;
  APPLE_JWT_PRIVATE_KEY_PEM: string;
  APPLE_VERIFICATION_KV_KEY?: string;
};

type ShopifySessionPayload = {
  iss: string;
  dest: string; // https://{shop}.myshopify.com
  aud: string;
  sub: string;
  exp: number;
  nbf: number;
  iat: number;
  jti: string;
  sid?: string;
};

function normalizeShopParam(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/\/.*/, '');
}

function oauthBounceHtml(authUrl: string): string {
  // Shopify OAuth must run at the top-level (not inside the Shopify Admin iframe).
  // This tiny page is served when we detect the shop isn't installed in our DB yet.
  const safeUrl = JSON.stringify(authUrl);
  return `<!doctype html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>Redirecting…</title></head><body><script>(function(){var url=${safeUrl};try{if(window.top){window.top.location.href=url;}else{window.location.href=url;}}catch(e){window.location.href=url;}})();</script><p>Redirecting to Shopify authentication…</p></body></html>`;
}

type ShopInfoApi = {
  shop: string;
  shopId: string;
  shopName: string;
  primaryDomain: string | null;
};

type DnsInstructionsApi = {
  recordType: 'CNAME' | 'ALIAS' | 'ANAME';
  host: string;
  value: string;
  note?: string;
};

type ApplePayStatusApi = {
  domain: string | null;
  status: 'NOT_STARTED' | 'DNS_NOT_CONFIGURED' | 'PENDING' | 'VERIFIED' | 'ERROR' | 'UNREGISTERED';
  lastError: string | null;
  cloudflareHostnameStatus: string | null;
  cloudflareSslStatus: string | null;
  dnsInstructions: DnsInstructionsApi | null;
  appleMerchantId: string | null;
};

type DomainListItemApi = {
  domain: string;
  status: 'NOT_STARTED' | 'DNS_NOT_CONFIGURED' | 'PENDING' | 'IN_PROCESS' | 'VERIFIED' | 'ERROR' | 'UNREGISTERED';
  lastError: string | null;
  cloudflareHostnameStatus: string | null;
  cloudflareSslStatus: string | null;
  appleMerchantId: string | null;
  lastCheckedAt: string | null;
  createdAt: string;
};

type DomainDetailsApi = DomainListItemApi & {
  dnsInstructions: DnsInstructionsApi;
  registrarInfo: {
    registrar: string | null;
    supported: boolean;
  } | null;
  cloudflareHostnameId: string | null;
};

type DomainScanResultApi = {
  registrar: string | null;
  supported: boolean;
  domainConnectUrl: string | null;
};


// -----------------------------------------------------------------------------
// App
// -----------------------------------------------------------------------------

const app = new Hono<{ Bindings: Env }>();

const WELL_KNOWN_PATH = '/.well-known/apple-developer-merchantid-domain-association';
const DEFAULT_VERIFICATION_KV_KEY = 'applepay:partner-verification-file';
const OAUTH_STATE_COOKIE = '__applepay_oauth_state';

function isAppHost(env: Env, url: URL): boolean {
  try {
    const appHost = new URL(env.SHOPIFY_APP_URL).hostname;
    return url.hostname === appHost;
  } catch {
    return false;
  }
}

function noStoreHeaders(): Record<string, string> {
  return {
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    'Pragma': 'no-cache',
    'Expires': '0',
  };
}

function cspHeaders(): Record<string, string> {
  // Embedded app: allow iframe in Shopify Admin.
  return {
    'Content-Security-Policy': [
      "frame-ancestors https://*.myshopify.com https://admin.shopify.com",
    ].join('; '),
  };
}

async function getPartnerVerificationFile(env: Env): Promise<string> {
  const key = env.APPLE_VERIFICATION_KV_KEY ?? DEFAULT_VERIFICATION_KV_KEY;
  const file = await env.APPLEPAY_KV.get(key);
  if (!file) {
    throw new Error(`Missing partner verification file in KV at key: ${key}`);
  }
  return file;
}

async function requireShopifySession(c: any): Promise<ShopifySessionPayload | Response> {
  const auth = c.req.header('Authorization') || '';
  const m = auth.match(/^Bearer\s+(.+)$/i);
  if (!m) {
    return c.json({ error: 'Missing Authorization: Bearer <token>' }, 401);
  }
  const token = m[1];

  let payload: ShopifySessionPayload;
  try {
    payload = (await verifyShopifySessionToken(
      token,
      c.env.SHOPIFY_API_KEY,
      c.env.SHOPIFY_API_SECRET
    )) as ShopifySessionPayload;
  } catch {
    return c.json({ error: 'Invalid Shopify session token' }, 401);
  }
  return payload;
}

function shopFromDest(dest: string): string {
  // dest is like: https://{shop}.myshopify.com
  const u = new URL(dest);
  return u.hostname;
}

function toApplePayStatus(row: MerchantDomainRow | null, dnsInstructions: DnsInstructionsApi | null = null): ApplePayStatusApi {
  if (!row) {
    return {
      domain: null,
      status: 'NOT_STARTED',
      lastError: null,
      cloudflareHostnameStatus: null,
      cloudflareSslStatus: null,
      dnsInstructions: null,
      appleMerchantId: null,
    };
  }

  return {
    domain: row.domain,
    status: (row.status as ApplePayStatusApi['status']) ?? 'NOT_STARTED',
    lastError: row.last_error,
    cloudflareHostnameStatus: row.cloudflare_hostname_status,
    cloudflareSslStatus: row.cloudflare_ssl_status,
    dnsInstructions,
    appleMerchantId: row.partner_internal_merchant_identifier,
  };
}

function toDomainListItem(row: MerchantDomainRow): DomainListItemApi {
  // Map status to include 'IN_PROCESS' for UI clarity
  let status: DomainListItemApi['status'] = (row.status as DomainListItemApi['status']) ?? 'NOT_STARTED';
  if (status === 'PENDING') {
    status = 'IN_PROCESS';
  }
  
  return {
    domain: row.domain,
    status,
    lastError: row.last_error,
    cloudflareHostnameStatus: row.cloudflare_hostname_status,
    cloudflareSslStatus: row.cloudflare_ssl_status,
    appleMerchantId: row.partner_internal_merchant_identifier,
    lastCheckedAt: row.apple_last_checked_at,
    createdAt: row.created_at ?? '',
  };
}

function toDomainDetails(row: MerchantDomainRow, cnameTarget: string): DomainDetailsApi {
  return {
    ...toDomainListItem(row),
    dnsInstructions: dnsInstructionsFor(row.domain, cnameTarget),
    registrarInfo: null, // Will be populated if we have scan results
    cloudflareHostnameId: row.cloudflare_hostname_id,
  };
}

async function detectRegistrar(domain: string): Promise<DomainScanResultApi> {
  // Stub implementation for registrar detection
  // In a real implementation, this would query WHOIS or DNS records
  // For now, we'll return a basic response indicating no Domain Connect support
  
  try {
    // Try to detect common registrars based on nameservers
    const nameservers: string[] = [];
    // DNS lookup would go here in a real implementation
    
    // Check for Domain Connect support
    // Domain Connect providers typically have a _domainconnect TXT record
    const domainConnectUrl = null; // Would be constructed based on actual Domain Connect API
    
    return {
      registrar: null,
      supported: false,
      domainConnectUrl: null,
    };
  } catch (e: any) {
    return {
      registrar: null,
      supported: false,
      domainConnectUrl: null,
    };
  }
}


async function preflightVerificationFile(domain: string, expectedFile: string): Promise<{ ok: boolean; reason?: string }> {
  const url = `https://${domain}${WELL_KNOWN_PATH}`;
  try {
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) {
      return { ok: false, reason: `HTTP ${res.status} fetching ${url}` };
    }
    const body = await res.text();
    // Compare by hash to avoid whitespace/line-ending differences.
    const got = await sha256Hex(body.trim());
    const want = await sha256Hex(expectedFile.trim());
    if (got !== want) {
      return { ok: false, reason: `Verification file mismatch at ${url}` };
    }
    return { ok: true };
  } catch (e: any) {
    return { ok: false, reason: `Failed fetching ${url}: ${e?.message || String(e)}` };
  }
}

function dnsInstructionsFor(domain: string, target: string): DnsInstructionsApi {
  return {
    recordType: 'CNAME',
    host: domain,
    value: target,
    note:
      'If your DNS provider does not allow CNAME at the apex (root), use an ALIAS/ANAME (or CNAME flattening if using Cloudflare DNS). After DNS propagates, click “Refresh” in this app.',
  };
}

async function proxyMerchantTrafficToShopify(c: any, u: URL): Promise<Response> {
  const host = u.hostname;

  // Lookup by exact hostname; also try stripping/adding "www.".
  const row =
    (await getMerchantDomainByDomain(c.env.DB, host)) ||
    (host.startsWith('www.')
      ? await getMerchantDomainByDomain(c.env.DB, host.slice(4))
      : await getMerchantDomainByDomain(c.env.DB, `www.${host}`));

  // If we don't recognize the hostname, just fall back to the default fetch.
  if (!row) {
    return fetch(c.req.raw);
  }

  // Proxy to Shopify but preserve the original Host header so Shopify routes
  // the request as a custom domain storefront.
  const originUrl = new URL(c.req.url);
  originUrl.protocol = 'https:';
  originUrl.hostname = row.shop;
  originUrl.port = '';

  const headers = new Headers(c.req.raw.headers);
  headers.set('host', host);
  headers.set('x-forwarded-host', host);
  headers.set('x-forwarded-proto', 'https');
  headers.set('x-forwarded-ssl', 'on'); // <-- ADDED THIS LINE

  const ip = headers.get('cf-connecting-ip');
  if (ip) headers.set('x-forwarded-for', ip);

  // Avoid mismatched content-length on streamed bodies.
  headers.delete('content-length');

  const method = c.req.method.toUpperCase();
  const body = method === 'GET' || method === 'HEAD' ? undefined : (c.req.raw.body as any);

  return fetch(originUrl.toString(), {
    method,
    headers,
    body,
    redirect: 'manual',
  });
}


// -----------------------------------------------------------------------------
// Public (merchant-domain) routes
// -----------------------------------------------------------------------------

// The domain verification file must be served on EVERY merchant domain at the exact path.
app.get(WELL_KNOWN_PATH, async (c) => {
  try {
    const file = await getPartnerVerificationFile(c.env);
    return new Response(file, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        ...noStoreHeaders(),
      },
    });
  } catch (e: any) {
    return c.text(e?.message || 'Missing verification file', 500);
  }
});

// Optional (but implemented): Apple Pay merchant validation sessions.
// This is used by storefront JS (same-origin) to exchange Apple’s validationURL for a merchant session.
app.post(
  '/applepay/session',
  cors({ origin: '*', allowMethods: ['POST', 'OPTIONS'], allowHeaders: ['Content-Type'] }),
  async (c) => {
    const host = new URL(c.req.url).hostname;
    const body = await c.req.json().catch(() => null);
    if (!body || typeof body.validationURL !== 'string') {
      return c.json({ error: 'Missing validationURL' }, 400);
    }

    // Find merchant by exact hostname; also try stripping "www.".
    const row =
      (await getMerchantDomainByDomain(c.env.DB, host)) ||
      (host.startsWith('www.') ? await getMerchantDomainByDomain(c.env.DB, host.slice(4)) : null);

    if (!row) {
      return c.json({ error: `No merchant registered for domain: ${host}` }, 404);
    }
    if (row.status !== 'VERIFIED') {
      return c.json({ error: `Domain not verified/registered yet: ${row.domain}` }, 409);
    }

    const initiativeContext = host;

    const merchantIdentifier = row.partner_internal_merchant_identifier;

    const session = await createPaymentSession({
      fetcher: c.env.APPLE_MTLS,
      validationUrl: body.validationURL,
      merchantIdentifier,
      displayName: row.partner_merchant_name,
      initiativeContext,
    });
    return c.json(session);
  },
);

// -----------------------------------------------------------------------------
// App-host routes (Shopify embedded app)
// -----------------------------------------------------------------------------

// Config for the React admin UI (Shopify App Bridge needs apiKey + host).
app.get('/api/config', async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text('Not Found', 404);

  // Fail loudly if env isn't configured, instead of returning undefined values
  // that cause App Bridge to throw a confusing INVALID_CONFIG error.
  const missing: string[] = [];
  if (!c.env.SHOPIFY_API_KEY) missing.push('SHOPIFY_API_KEY');
  if (!c.env.SHOPIFY_APP_URL) missing.push('SHOPIFY_APP_URL');
  if (missing.length) {
    return c.json(
      {
        error: `Missing required environment variables: ${missing.join(', ')}`,
      },
      500,
      {
        ...noStoreHeaders(),
      },
    );
  }

  return c.json(
    {
      shopifyApiKey: c.env.SHOPIFY_API_KEY,
      appUrl: c.env.SHOPIFY_APP_URL,
    },
    200,
    {
      ...noStoreHeaders(),
    },
  );
});

// Start OAuth
app.get('/auth', async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text('Not Found', 404);

  const shop = (u.searchParams.get('shop') || '').trim();
  const host = (u.searchParams.get('host') || '').trim();
  if (!isValidShopDomain(shop)) {
    return c.text('Invalid shop parameter', 400);
  }
  if (!host) {
    return c.text('Missing host parameter', 400);
  }

  const state = randomState();
  setCookie(c, OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 10,
  });

  const redirectUri = `${c.env.SHOPIFY_APP_URL}/auth/callback`;
  const authorizeUrl = buildShopifyAuthorizeUrl({
    shop,
    apiKey: c.env.SHOPIFY_API_KEY,
    scopes: c.env.SHOPIFY_SCOPES,
    redirectUri,
    state,
  });

  return c.redirect(authorizeUrl, 302);
});

// OAuth callback
app.get('/auth/callback', async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text('Not Found', 404);

  const shop = (u.searchParams.get('shop') || '').trim();
  const host = (u.searchParams.get('host') || '').trim();
  const code = (u.searchParams.get('code') || '').trim();
  const state = (u.searchParams.get('state') || '').trim();

  if (!shop || !host || !code || !state) {
    return c.text('Missing OAuth callback parameters', 400);
  }
  if (!(await verifyShopifyHmac({ url: u, apiSecret: c.env.SHOPIFY_API_SECRET }))) {
    return c.text('Invalid HMAC', 400);
  }

  const cookieState = getCookie(c, OAUTH_STATE_COOKIE);
  if (!cookieState || cookieState !== state) {
    return c.text('Invalid OAuth state', 400);
  }
  deleteCookie(c, OAUTH_STATE_COOKIE, { path: '/' });

  const tokenRes = await exchangeAccessToken({
    shop,
    apiKey: c.env.SHOPIFY_API_KEY,
    apiSecret: c.env.SHOPIFY_API_SECRET,
    code,
  });

  const info = await getShopInfo({
    shop,
    accessToken: tokenRes.accessToken,
    apiVersion: c.env.SHOPIFY_API_VERSION,
  });

  await upsertShop(c.env.DB, {
    shop,
    shopId: info.shopId,
    shopName: info.name,
    accessToken: tokenRes.accessToken,
    scopes: tokenRes.scope,
    installedAt: nowIso(),
  });

  // Keep install -> uninstall lifecycle clean.
  try {
    await registerAppUninstalledWebhook({
      shop,
      accessToken: tokenRes.accessToken,
      apiVersion: c.env.SHOPIFY_API_VERSION,
      callbackUrl: `${c.env.SHOPIFY_APP_URL}/webhooks/shopify/app-uninstalled`,
    });
  } catch (e: any) {
    const message = e?.message || String(e);
    if (!message.includes('Address for this topic has already been taken')) {
      throw e;
    }
    console.warn('Webhook already registered. Skipping duplicate registration.');
  }

  // Back into the embedded app.
  return c.redirect(`${c.env.SHOPIFY_APP_URL}/?shop=${encodeURIComponent(shop)}&host=${encodeURIComponent(host)}`, 302);
});

// Shopify webhook: app/uninstalled
app.post('/webhooks/shopify/app-uninstalled', async (c) => {
  const raw = await c.req.text();
  const hmac = c.req.header('X-Shopify-Hmac-Sha256') || '';
  const topic = c.req.header('X-Shopify-Topic') || 'app/uninstalled';
  const webhookId = c.req.header('X-Shopify-Webhook-Id') || '';
  const shop = (c.req.header('X-Shopify-Shop-Domain') || '').trim();

  const receivedAt = nowIso();
  let status: 'OK' | 'ERROR' = 'OK';

  try {
    const rawBytes = new TextEncoder().encode(raw);
    if (!(await verifyShopifyWebhookHmac({ apiSecret: c.env.SHOPIFY_API_SECRET, rawBody: rawBytes, hmacHeader: hmac }))) {
      status = 'ERROR';
      await logWebhookEvent(c.env.DB, {
        shop: shop || 'unknown',
        topic,
        webhookId,
        payload: raw,
        receivedAt,
        processedAt: nowIso(),
        status: 'ERROR',
      });
      return c.text('Invalid webhook HMAC', 401);
    }

    if (shop) {
      await markShopUninstalled(c.env.DB, shop, nowIso());

      // Best-effort cleanup: unregister merchant + delete custom hostname.
      const md = await getMerchantDomainByShop(c.env.DB, shop);
      if (md?.partner_internal_merchant_identifier) {
        try {
          await unregisterMerchant({
            fetcher: c.env.APPLE_MTLS,
            appleEnv: c.env.APPLE_ENV,
            merchantIdentifier: md.partner_internal_merchant_identifier,
            useJwt: c.env.APPLE_USE_JWT === 'true',
            issuer: c.env.APPLE_ENCRYPT_TO,
            certificatePem: c.env.APPLE_JWT_CERT_PEM,
            privateKeyPem: c.env.APPLE_JWT_PRIVATE_KEY_PEM,
          });
          await updateMerchantDomainAppleStatus(c.env.DB, {
            domain: md.domain,
            status: 'UNREGISTERED',
            lastError: null,
            appleLastCheckedAt: nowIso(),
          });
        } catch (e: any) {
          // Keep going.
        }
      }

      if (md?.cloudflare_hostname_id) {
        try {
          await deleteCustomHostname({
            apiToken: c.env.CF_API_TOKEN,
            zoneId: c.env.CF_ZONE_ID,
            customHostnameId: md.cloudflare_hostname_id,
          });
        } catch {
          // ignore
        }
      }
    }

    await logWebhookEvent(c.env.DB, {
      shop: shop || 'unknown',
      topic,
      webhookId,
      payload: raw,
      receivedAt,
      processedAt: nowIso(),
      status: 'OK',
    });
  } catch (e: any) {
    status = 'ERROR';
    await logWebhookEvent(c.env.DB, {
      shop: shop || 'unknown',
      topic,
      webhookId,
      payload: raw,
      receivedAt,
      processedAt: nowIso(),
      status: 'ERROR',
    });
  }

  return c.text('OK', 200);
});

// Session-authenticated API: shop info
app.get('/api/shop', async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text('Not Found', 404);

  const payload = await requireShopifySession(c);
  if (payload instanceof Response) return payload;

  const shop = shopFromDest(payload.dest);
  const shopRow = await getShopByShop(c.env.DB, shop);
  if (!shopRow || shopRow.uninstalled_at) {
    return c.json({ error: 'App not installed for this shop' }, 401);
  }

  const info = await getShopInfo({
    shop,
    accessToken: shopRow.access_token,
    apiVersion: c.env.SHOPIFY_API_VERSION,
  });

  const out: ShopInfoApi = {
    shop,
    shopId: info.shopId,
    shopName: info.name,
    primaryDomain: info.primaryDomainHost || null,
  };

  return c.json(out, 200, { ...noStoreHeaders() });
});

// Session-authenticated API: current Apple Pay status
app.get('/api/applepay/status', async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text('Not Found', 404);

  const payload = await requireShopifySession(c);
  if (payload instanceof Response) return payload;

  const shop = shopFromDest(payload.dest);
  const shopRow = await getShopByShop(c.env.DB, shop);
  if (!shopRow || shopRow.uninstalled_at) {
    return c.json({ error: 'App not installed for this shop' }, 401);
  }

  const requestedDomain = (c.req.query('domain') || '').trim().toLowerCase();
  let md = null as Awaited<ReturnType<typeof getMerchantDomainByShop>>;
  if (requestedDomain) {
    const byDomain = await getMerchantDomainByDomain(c.env.DB, requestedDomain);
    if (byDomain && byDomain.shop === shop) md = byDomain;
  }
  if (!md) {
    md = await getMerchantDomainByShop(c.env.DB, shop);
  }
  return c.json(toApplePayStatus(md), 200, { ...noStoreHeaders() });
});

// Session-authenticated API: onboard (domain verification + registerMerchant)
app.post('/api/applepay/onboard', async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text('Not Found', 404);

  const payload = await requireShopifySession(c);
  if (payload instanceof Response) return payload;

  const shop = shopFromDest(payload.dest);
  const shopRow = await getShopByShop(c.env.DB, shop);
  if (!shopRow || shopRow.uninstalled_at) {
    return c.json({ error: 'App not installed for this shop' }, 401);
  }

  // Fetch freshest info from Shopify.
  const info = await getShopInfo({
    shop,
    accessToken: shopRow.access_token,
    apiVersion: c.env.SHOPIFY_API_VERSION,
  });
  const domain = (info.primaryDomainHost || '').trim();
  if (!domain || domain.endsWith('.myshopify.com')) {
    return c.json({ error: 'A custom primary domain is required (not *.myshopify.com)' }, 400);
  }

  // Ensure Cloudflare Custom Hostname exists for this domain.
let ch = null as Awaited<ReturnType<typeof findCustomHostname>>;
try {
  const existing = await findCustomHostname({
    apiToken: c.env.CF_API_TOKEN,
    zoneId: c.env.CF_ZONE_ID,
    hostname: domain,
  });

  ch = existing;

  if (!ch) {
    ch = await createCustomHostname({
      apiToken: c.env.CF_API_TOKEN,
      zoneId: c.env.CF_ZONE_ID,
      hostname: domain,
      customMetadata: {
        shop,
        shop_id: shopRow.shop_id,
      },
    });
  }
} catch (e: any) {
    const dnsInstructions = dnsInstructionsFor(domain, c.env.CF_SAAS_CNAME_TARGET);
    await upsertMerchantDomain(c.env.DB, {
      shop,
      shopId: shopRow.shop_id,
      domain,
      partnerInternalMerchantIdentifier: shopRow.shop_id,
      partnerMerchantName: info.name,
      encryptTo: c.env.APPLE_ENCRYPT_TO,
      environment: c.env.APPLE_ENV,
      status: 'DNS_NOT_CONFIGURED',
      lastError: e?.message || String(e),
      cloudflareHostnameId: null,
      cloudflareHostnameStatus: null,
      cloudflareSslStatus: null,
      appleLastCheckedAt: null,
    });

    return c.json(toApplePayStatus(await getMerchantDomainByShop(c.env.DB, shop), dnsInstructions), 200, {
      ...noStoreHeaders(),
    });
  }

  const cfHostStatus = ch.status || null;
  const cfSslStatus = ch.ssl?.status || null;

  // Persist/refresh our merchant domain record.
  await upsertMerchantDomain(c.env.DB, {
    shop,
    shopId: shopRow.shop_id,
    domain,
    partnerInternalMerchantIdentifier: shopRow.shop_id,
    partnerMerchantName: info.name,
    encryptTo: c.env.APPLE_ENCRYPT_TO,
    environment: c.env.APPLE_ENV,
    status: 'DNS_NOT_CONFIGURED',
    lastError: null,
    cloudflareHostnameId: ch.id,
    cloudflareHostnameStatus: cfHostStatus,
    cloudflareSslStatus: cfSslStatus,
    appleLastCheckedAt: null,
  });

  // Preflight: verify the merchant domain is already serving the partner verification file.
  const expectedFile = await getPartnerVerificationFile(c.env);
  const preflight = await preflightVerificationFile(domain, expectedFile);
  if (!preflight.ok) {
    const dnsInstructions = dnsInstructionsFor(domain, c.env.CF_SAAS_CNAME_TARGET);

    await updateMerchantDomainCloudflareStatus(c.env.DB, {
      domain,
      cloudflareHostnameId: ch.id,
      cloudflareHostnameStatus: cfHostStatus,
      cloudflareSslStatus: cfSslStatus,
      lastError: preflight.reason || 'Domain not serving verification file yet',
    });
    await updateMerchantDomainAppleStatus(c.env.DB, {
      domain,
      status: 'DNS_NOT_CONFIGURED',
      lastError: preflight.reason || 'Domain not serving verification file yet',
      appleLastCheckedAt: nowIso(),
    });

    const md = await getMerchantDomainByShop(c.env.DB, shop);
    return c.json(toApplePayStatus(md, dnsInstructions), 200, { ...noStoreHeaders() });
  }

  // Apple requires the file in place BEFORE registerMerchant.
  // Now that preflight succeeded, we can register the merchant.
  try {
    await registerMerchant({
      fetcher: c.env.APPLE_MTLS,
      appleEnv: c.env.APPLE_ENV,
      domain,
      encryptTo: c.env.APPLE_ENCRYPT_TO,
      partnerInternalMerchantIdentifier: shopRow.shop_id,
      partnerMerchantName: info.name,
      useJwt: c.env.APPLE_USE_JWT === 'true',
      issuer: c.env.APPLE_ENCRYPT_TO,
      certificatePem: c.env.APPLE_JWT_CERT_PEM,
      privateKeyPem: c.env.APPLE_JWT_PRIVATE_KEY_PEM,
    });

    await updateMerchantDomainAppleStatus(c.env.DB, {
      domain,
      status: 'VERIFIED',
      lastError: null,
      appleLastCheckedAt: nowIso(),
    });
  } catch (e: any) {
    await updateMerchantDomainAppleStatus(c.env.DB, {
      domain,
      status: 'ERROR',
      lastError: e?.message || String(e),
      appleLastCheckedAt: nowIso(),
    });
  }

  const md = await getMerchantDomainByShop(c.env.DB, shop);
  return c.json(toApplePayStatus(md), 200, { ...noStoreHeaders() });
});

// Session-authenticated API: check merchant details (debug)
app.post('/api/applepay/check', async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text('Not Found', 404);

  const payload = await requireShopifySession(c);
  if (payload instanceof Response) return payload;

  const shop = shopFromDest(payload.dest);
  const shopRow = await getShopByShop(c.env.DB, shop);
  if (!shopRow || shopRow.uninstalled_at) {
    return c.json({ error: 'App not installed for this shop' }, 401);
  }

  const md = await getMerchantDomainByShop(c.env.DB, shop);
  if (!md) return c.json(toApplePayStatus(null), 200, { ...noStoreHeaders() });

  try {
    const details = await getMerchantDetails({
      fetcher: c.env.APPLE_MTLS,
      appleEnv: c.env.APPLE_ENV,
      merchantIdentifier: md.partner_internal_merchant_identifier,
      useJwt: c.env.APPLE_USE_JWT === 'true',
      issuer: c.env.APPLE_ENCRYPT_TO,
      certificatePem: c.env.APPLE_JWT_CERT_PEM,
      privateKeyPem: c.env.APPLE_JWT_PRIVATE_KEY_PEM,
    });
    // We don’t have a formal status field; treat successful fetch as healthy.
    await updateMerchantDomainAppleStatus(c.env.DB, {
      domain: md.domain,
      status: md.status,
      lastError: null,
      appleLastCheckedAt: nowIso(),
    });
    return c.json(
      {
        ...toApplePayStatus(await getMerchantDomainByShop(c.env.DB, shop)),
        details,
      },
      200,
      { ...noStoreHeaders() },
    );
  } catch (e: any) {
    await updateMerchantDomainAppleStatus(c.env.DB, {
      domain: md.domain,
      status: 'ERROR',
      lastError: e?.message || String(e),
      appleLastCheckedAt: nowIso(),
    });
    return c.json(toApplePayStatus(await getMerchantDomainByShop(c.env.DB, shop)), 200, { ...noStoreHeaders() });
  }
});

// Session-authenticated API: list all domains for a shop
app.get('/api/domains', async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text('Not Found', 404);

  const payload = await requireShopifySession(c);
  if (payload instanceof Response) return payload;

  const shop = shopFromDest(payload.dest);
  const shopRow = await getShopByShop(c.env.DB, shop);
  if (!shopRow || shopRow.uninstalled_at) {
    return c.json({ error: 'App not installed for this shop' }, 401);
  }

  const domains = await getMerchantDomainsByShop(c.env.DB, shop);
  const result = domains.map(toDomainListItem);

  return c.json({ domains: result }, 200, { ...noStoreHeaders() });
});

// Session-authenticated API: scan domain for registrar and Domain Connect support
app.post('/api/domains/scan', async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text('Not Found', 404);

  const payload = await requireShopifySession(c);
  if (payload instanceof Response) return payload;

  const shop = shopFromDest(payload.dest);
  const shopRow = await getShopByShop(c.env.DB, shop);
  if (!shopRow || shopRow.uninstalled_at) {
    return c.json({ error: 'App not installed for this shop' }, 401);
  }

  const body = await c.req.json().catch(() => ({}));
  const domain = (body.domain ?? '').trim().toLowerCase();
  
  if (!domain) {
    return c.json({ error: 'Domain is required' }, 400);
  }

  const scanResult = await detectRegistrar(domain);
  return c.json(scanResult, 200, { ...noStoreHeaders() });
});

// Session-authenticated API: onboard a new domain
app.post('/api/domains/onboard', async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text('Not Found', 404);

  const payload = await requireShopifySession(c);
  if (payload instanceof Response) return payload;

  const shop = shopFromDest(payload.dest);
  const shopRow = await getShopByShop(c.env.DB, shop);
  if (!shopRow || shopRow.uninstalled_at) {
    return c.json({ error: 'App not installed for this shop' }, 401);
  }

  const body = await c.req.json().catch(() => ({}));
  const domain = (body.domain ?? '').trim().toLowerCase();
  
  if (!domain) {
    return c.json({ error: 'Domain is required' }, 400);
  }

  if (domain.endsWith('.myshopify.com')) {
    return c.json({ error: 'Custom domain required (not *.myshopify.com)' }, 400);
  }

  // Fetch shop info for merchant name
  const info = await getShopInfo({
    shop,
    accessToken: shopRow.access_token,
    apiVersion: c.env.SHOPIFY_API_VERSION,
  });

  // Ensure Cloudflare Custom Hostname exists for this domain
  let ch = null as Awaited<ReturnType<typeof findCustomHostname>>;
  try {
    const existing = await findCustomHostname({
      apiToken: c.env.CF_API_TOKEN,
      zoneId: c.env.CF_ZONE_ID,
      hostname: domain,
    });

    ch = existing;

    if (!ch) {
      ch = await createCustomHostname({
        apiToken: c.env.CF_API_TOKEN,
        zoneId: c.env.CF_ZONE_ID,
        hostname: domain,
        customMetadata: {
          shop,
          shop_id: shopRow.shop_id,
        },
      });
    }
  } catch (e: any) {
    // DNS not configured yet - store the domain record
    await upsertMerchantDomain(c.env.DB, {
      shop,
      shopId: shopRow.shop_id,
      domain,
      partnerInternalMerchantIdentifier: shopRow.shop_id,
      partnerMerchantName: info.name,
      encryptTo: c.env.APPLE_ENCRYPT_TO,
      environment: c.env.APPLE_ENV,
      status: 'DNS_NOT_CONFIGURED',
      lastError: e?.message || String(e),
      cloudflareHostnameId: null,
      cloudflareHostnameStatus: null,
      cloudflareSslStatus: null,
      appleLastCheckedAt: null,
    });

    const md = await getMerchantDomainByDomain(c.env.DB, domain);
    return c.json(md ? toDomainListItem(md) : null, 200, { ...noStoreHeaders() });
  }

  const cfHostStatus = ch.status || null;
  const cfSslStatus = ch.ssl?.status || null;

  // Persist/refresh our merchant domain record with IN_PROCESS status
  await upsertMerchantDomain(c.env.DB, {
    shop,
    shopId: shopRow.shop_id,
    domain,
    partnerInternalMerchantIdentifier: shopRow.shop_id,
    partnerMerchantName: info.name,
    encryptTo: c.env.APPLE_ENCRYPT_TO,
    environment: c.env.APPLE_ENV,
    status: 'PENDING', // Will show as IN_PROCESS in UI
    lastError: null,
    cloudflareHostnameId: ch.id,
    cloudflareHostnameStatus: cfHostStatus,
    cloudflareSslStatus: cfSslStatus,
    appleLastCheckedAt: null,
  });

  // Immediately attempt Apple registration (NO PREFLIGHT CHECKS as per requirements)
  try {
    await registerMerchant({
      fetcher: c.env.APPLE_MTLS,
      appleEnv: c.env.APPLE_ENV,
      domain,
      encryptTo: c.env.APPLE_ENCRYPT_TO,
      partnerInternalMerchantIdentifier: shopRow.shop_id,
      partnerMerchantName: info.name,
      useJwt: c.env.APPLE_USE_JWT === 'true',
      issuer: c.env.APPLE_ENCRYPT_TO,
      certificatePem: c.env.APPLE_JWT_CERT_PEM,
      privateKeyPem: c.env.APPLE_JWT_PRIVATE_KEY_PEM,
    });

    await updateMerchantDomainAppleStatus(c.env.DB, {
      domain,
      status: 'VERIFIED',
      lastError: null,
      appleLastCheckedAt: nowIso(),
    });
  } catch (e: any) {
    // If Apple registration fails, update status but don't fail the request
    await updateMerchantDomainAppleStatus(c.env.DB, {
      domain,
      status: 'ERROR',
      lastError: e?.message || String(e),
      appleLastCheckedAt: nowIso(),
    });
  }

  const md = await getMerchantDomainByDomain(c.env.DB, domain);
  return c.json(md ? toDomainListItem(md) : null, 200, { ...noStoreHeaders() });
});

// Session-authenticated API: get detailed info for a domain
app.get('/api/domains/:domain/details', async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text('Not Found', 404);

  const payload = await requireShopifySession(c);
  if (payload instanceof Response) return payload;

  const shop = shopFromDest(payload.dest);
  const shopRow = await getShopByShop(c.env.DB, shop);
  if (!shopRow || shopRow.uninstalled_at) {
    return c.json({ error: 'App not installed for this shop' }, 401);
  }

  const domain = c.req.param('domain');
  const md = await getMerchantDomainByDomain(c.env.DB, domain);

  if (!md || md.shop !== shop) {
    return c.json({ error: 'Domain not found' }, 404);
  }

  const details = toDomainDetails(md, c.env.CF_SAAS_CNAME_TARGET);
  return c.json(details, 200, { ...noStoreHeaders() });
});

// -----------------------------------------------------------------------------
// Static assets (admin UI)
// -----------------------------------------------------------------------------

app.all('*', async (c) => {
  const u = new URL(c.req.url);

  // ---------------------------------------------------------------------------
  // Merchant domain traffic (custom hostnames)
  // ---------------------------------------------------------------------------
  // For merchant storefront traffic we ONLY intercept Apple Pay-specific routes
  // (handled above). Everything else should pass through to the per-hostname
  // custom origin configured in Cloudflare for SaaS (custom_origin_server).
if (!isAppHost(c.env, u)) {
  return proxyMerchantTrafficToShopify(c, u);
}


  // ---------------------------------------------------------------------------
  // App host traffic (embedded admin UI)
  // ---------------------------------------------------------------------------
  if (c.req.method !== 'GET') {
    return c.text('Not Found', 404);
  }

  // Install gate: if this shop hasn't completed OAuth (or the DB was reset),
  // bounce into /auth at the TOP LEVEL (not within the iframe).
  const accept = c.req.header('accept') ?? '';
  if (accept.includes('text/html')) {
    const shopParam = u.searchParams.get('shop');
    const hostParam = u.searchParams.get('host');
    if (shopParam && hostParam) {
      const shop = normalizeShopParam(shopParam);
      if (isValidShopDomain(shop)) {
        const existing = await getShopByShop(c.env.DB, shop);
        if (!existing) {
          const authUrl = new URL('/auth', c.env.SHOPIFY_APP_URL);
          authUrl.searchParams.set('shop', shop);
          authUrl.searchParams.set('host', hostParam);

          return c.html(oauthBounceHtml(authUrl.toString()), 200, {
            ...cspHeaders(),
            ...noStoreHeaders(),
          });
        }
      }
    }
  }

  const res = await c.env.ASSETS.fetch(c.req.raw);
  const headers = new Headers(res.headers);
  Object.entries(cspHeaders()).forEach(([k, v]) => headers.set(k, v));
  Object.entries(noStoreHeaders()).forEach(([k, v]) => headers.set(k, v));
  return new Response(res.body, { status: res.status, headers });
});

export default {
  // 1. Pass web requests to your existing Hono app
  fetch: app.fetch,

  // 2. Add the missing Scheduled handler for Cron triggers
  scheduled: (_event: ScheduledEvent, _env: Env, _ctx: ExecutionContext) => {
    // no-op: prevents cron trigger exceptions
    console.log("Cron trigger fired");
    // Add any scheduled logic here if needed
  },
};
