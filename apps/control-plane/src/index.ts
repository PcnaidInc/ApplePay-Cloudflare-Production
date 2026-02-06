import { Hono } from 'hono';
import { setCookie, getCookie, deleteCookie } from 'hono/cookie';
import { cors } from 'hono/cors';
import { normalizeHostname } from "./lib/domains";

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
import { requireShopifySession, getShopifySession } from './middleware/requireShopifySession';
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
  getShopByShop,
  logWebhookEvent,
  markShopUninstalled,
  upsertMerchantDomain,
  upsertShop,
  updateMerchantDomainAppleStatus,
  listMerchantDomainsByShop,
  updateMerchantDomainCloudflareStatus,
  type MerchantDomainRow,
} from './lib/oracleDb';
import { createOrdsClient, OrdsClient, OrdsError } from './lib/ordsClient';
import {
  performOp,
  nowIso,
  randomState,
  sha256Hex,
} from './lib/util';

// Schema management is now handled manually via Oracle migrations
// No runtime schema ensure needed


// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

function safeError(err: unknown): { name?: string; message: string; stack?: string } {
  if (err instanceof Error) return { name: err.name, message: err.message, stack: err.stack };
  return { message: String(err) };
}

function getPathAndHost(reqUrl: string): { host: string; path: string } {
  try {
    const u = new URL(reqUrl);
    return { host: u.host, path: u.pathname };
  } catch {
    return { host: 'unknown', path: 'unknown' };
  }
}

function logEvent(
  c: any,
  level: LogLevel,
  msg: string,
  fields: Record<string, unknown> = {},
) {
  const requestId = (c.get('requestId') ?? 'unknown') as string;
  const flowId = (c.get('flowId') ?? requestId) as string;
  const step = (c.get('step') ?? 0) as number;
  const { host, path } = getPathAndHost(c.req.url);

  const payload = {
    ts: new Date().toISOString(),
    level,
    msg,
    requestId,
    flowId,
    step,
    http: {
      method: c.req.method,
      host,
      path,
      cfRay: c.req.header('cf-ray') ?? null,
    },
    ...fields,
  };

  const line = JSON.stringify(payload);
  if (level === 'error') console.error(line);
  else console.log(line);
}

async function withStep<T>(c: any, name: string, fn: () => Promise<T>): Promise<T> {
  const nextStep = ((c.get('step') ?? 0) as number) + 1;
  c.set('step', nextStep);

  const started = Date.now();
  logEvent(c, 'info', 'step.start', { stepName: name });

  try {
    const out = await fn();
    logEvent(c, 'info', 'step.ok', { stepName: name, durationMs: Date.now() - started });
    return out;
  } catch (err) {
    logEvent(c, 'error', 'step.error', { stepName: name, durationMs: Date.now() - started, error: safeError(err) });
    throw err;
  }
}


type Fetcher = {
  fetch(input: URL | RequestInfo, init?: RequestInit): Promise<Response>;
};

type Env = {
  // Storage
  APPLEPAY_KV: KVNamespace;

  // Static assets (built admin-ui)
  ASSETS: Fetcher;

  // Outbound mTLS to Apple (configured in wrangler via mtls_certificates)
  APPLE_MTLS: Fetcher;

  // Oracle Database via ORDS (REST-Enabled SQL)
  ORDS_BASE_URL: string;
  ORDS_SCHEMA_ALIAS: string;
  ORDS_USERNAME: string;
  ORDS_PASSWORD: string;
  ORDS_AUTH_MODE?: 'basic' | 'oauth';

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

// -----------------------------------------------------------------------------
// App
// -----------------------------------------------------------------------------

type ObsVars = {
  requestId: string;
  flowId: string;
  step: number;
  shopifySession?: { payload: any; shop: string };
  oracleClient?: OrdsClient;
};

const app = new Hono<{ Bindings: Env; Variables: ObsVars }>();

const WELL_KNOWN_PATH = '/.well-known/apple-developer-merchantid-domain-association';
const DEFAULT_VERIFICATION_KV_KEY = 'applepay:partner-verification-file';
const OAUTH_STATE_COOKIE = '__applepay_oauth_state';

/**
 * Get or create Oracle ORDS client for this request
 */
function getOracleClient(c: any): OrdsClient {
  let client = c.get('oracleClient');
  if (!client) {
    try {
      client = createOrdsClient(c.env);
      c.set('oracleClient', client);
    } catch (err) {
      logEvent(c, 'error', 'oracle.client.creation.failed', { error: safeError(err) });
      throw new Error('Failed to initialize Oracle database client. Please check ORDS configuration.');
    }
  }
  return client;
}

// Error handler must be registered BEFORE routes
app.onError((err, c) => {
  logEvent(c, 'error', 'unhandled.exception', { error: safeError(err) });

  const requestId = (c.get('requestId') ?? 'unknown') as string;
  const flowId = (c.get('flowId') ?? requestId) as string;

  const accept = c.req.header('accept') ?? '';
  const xRequestedWith = c.req.header('x-requested-with') ?? '';

  // Prefer JSON for XHR / API calls (even if the browser also accepts text/html).
  const wantsJson =
    accept.includes('application/json') ||
    accept.includes('application/*+json') ||
    xRequestedWith.toLowerCase() === 'xmlhttprequest';

  if (!wantsJson && accept.includes('text/html')) {
    return c.html(
      `<!doctype html>
      <html><body style="font-family: system-ui; padding: 24px;">
        <h2>Something went wrong</h2>
        <p>Request ID: <code>${requestId}</code></p>
        <p>Flow ID: <code>${flowId}</code></p>
      </body></html>`,
      500,
    );
  }

  return c.json({ error: 'Internal error', msg: String(err), requestId, flowId }, 500);
});

// Global middleware for request tracking and correlation
app.use('*', async (c, next) => {

  // Prefer inbound correlation headers, else fall back to cf-ray, else generate.
  const requestId =
    c.req.header('x-request-id') ||
    c.req.header('cf-ray') ||
    crypto.randomUUID();

  // Flow ID: stable across multiple requests in one "operation" if the UI sends it.
  const flowId =
    c.req.header('x-flow-id') ||
    requestId;

  c.set('requestId', requestId);
  c.set('flowId', flowId);
  c.set('step', 0);

  const started = Date.now();

  try {
    // Oracle client initialization is lazy - created only when needed via getOracleClient()
    await next();
  } finally {
    try {
      // Correlation headers back to the client
      c.header('x-request-id', requestId);
      c.header('x-flow-id', flowId);

      // Compact latency hint (shows up in browser devtools timing tab)
      const duration = Date.now() - started;
      c.header('server-timing', `worker;dur=${duration}`);

      logEvent(c, 'info', 'request.complete', {
        status: c.res?.status ?? null,
        durationMs: duration,
      });
    } catch (finallyErr) {
      // Log but don't throw - finally block errors can mask the original error
      console.error('Error in finally block:', safeError(finallyErr));
    }
  }
});

function isAppHost(env: Env, url: URL): boolean {
  try {
    if (url.hostname.endsWith('.workers.dev') || url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
      return true;
    }
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
  const row = await withStep(c, 'db.getMerchantDomainByDomain', async () => {
    const exact = await getMerchantDomainByDomain(getOracleClient(c), host);
    if (exact) return exact;
    if (host.startsWith('www.')) {
      return await getMerchantDomainByDomain(getOracleClient(c), host.slice(4));
    }
    return await getMerchantDomainByDomain(getOracleClient(c), `www.${host}`);
  });

// If we don't recognize the hostname, DO NOT fall back to fetch(c.req.raw).
// That can recurse back into this Worker (especially in dev) and cause a 500 loop.
if (!row) {
  logEvent(c, 'warn', 'proxy.unknownDomain', { domain: host });
  return c.text(`Unknown domain: ${host}`, 404);
}


  // Proxy to Shopify but preserve the original Host header so Shopify routes
  // the request as a custom domain storefront.
  return await withStep(c, 'proxy.forwardToShopify', async () => {
    const originUrl = new URL(c.req.url);
    originUrl.protocol = 'https:';
    originUrl.hostname = row.shop;
    originUrl.port = '';

    const headers = new Headers(c.req.raw.headers);
    headers.set('host', host);
    headers.set('x-forwarded-host', host);
    headers.set('x-forwarded-proto', 'https');
    headers.set('x-forwarded-ssl', 'on');

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
  });
}

// -----------------------------------------------------------------------------
// Public (merchant-domain) routes
// -----------------------------------------------------------------------------

// The domain verification file must be served on EVERY merchant domain at the exact path.
app.get(WELL_KNOWN_PATH, async (c) => {
  try {
    const file = await withStep(c, 'kv.getPartnerVerificationFile', () =>
      getPartnerVerificationFile(c.env)
    );
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
    const row = await withStep(c, 'db.getMerchantDomainByDomain', async () => {
      const exact = await getMerchantDomainByDomain(getOracleClient(c), host);
      if (exact) return exact;
      if (host.startsWith('www.')) {
        return await getMerchantDomainByDomain(getOracleClient(c), host.slice(4));
      }
      return null;
    });

    if (!row) {
      return c.json({ error: `No merchant registered for domain: ${host}` }, 404);
    }
    if (row.status !== 'VERIFIED') {
      return c.json({ error: `Domain not verified/registered yet: ${row.domain}` }, 409);
    }

    const initiativeContext = host;
    const merchantIdentifier = row.partner_internal_merchant_identifier;

    const session = await withStep(c, 'apple.createPaymentSession', () =>
      createPaymentSession({
        fetcher: c.env.APPLE_MTLS,
        validationUrl: body.validationURL,
        merchantIdentifier,
        displayName: row.partner_merchant_name,
        initiativeContext,
      })
    );
    return c.json(session);
  },
);

// -----------------------------------------------------------------------------
// App-host routes (Shopify embedded app)
// -----------------------------------------------------------------------------

app.get('/api/debug/runtime', async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text('Not Found', 404);

  return c.json(
    {
      appleEnv: c.env.APPLE_ENV,   // "production" or "sandbox"
      hasDB: !!getOracleClient(c),           // should be true
      hasKV: !!c.env.APPLEPAY_KV,  // should be true
    },
    200,
    { ...noStoreHeaders() },
  );
});

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
      cnameTarget: c.env.CF_SAAS_CNAME_TARGET,
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

app.get("/auth/callback", async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text("Not Found", 404);

  const shop = normalizeShopParam(u.searchParams.get("shop") || "");
  const host = (u.searchParams.get("host") || "").trim();
  const code = (u.searchParams.get("code") || "").trim();
  const state = (u.searchParams.get("state") || "").trim();

  if (!shop || !host || !code || !state) {
    return c.text("Missing OAuth callback parameters", 400);
  }
  if (!isValidShopDomain(shop)) {
    return c.text("Invalid shop parameter", 400);
  }

  // HMAC validation
  const ok = await verifyShopifyHmac({ url: u, apiSecret: c.env.SHOPIFY_API_SECRET });
  if (!ok) return c.text("Invalid HMAC", 400);

  // State validation
  const cookieState = getCookie(c, OAUTH_STATE_COOKIE);
  if (!cookieState || cookieState !== state) {
    // NOTE: This was happening after your 500 because you were deleting the cookie too early.
    return c.text("Invalid OAuth state", 400);
  }

  // 1) Exchange token (must succeed)
  let tokenRes: { accessToken: string; scope: string };
  try {
    tokenRes = await withStep(c, "shopify.exchangeAccessToken", () =>
      exchangeAccessToken({
        shop,
        apiKey: c.env.SHOPIFY_API_KEY,
        apiSecret: c.env.SHOPIFY_API_SECRET,
        code,
      }),
    );
  } catch (err) {
    logEvent(c, "error", "oauth.exchange_failed", { error: safeError(err) });
    // IMPORTANT: keep cookie so the error isn't followed by a guaranteed "Invalid OAuth state"
    return c.text("Failed to exchange Shopify access token (check server logs)", 502);
  }

  // 2) Persist shop ASAP so the app is considered installed even if post-install steps fail
  try {
    await withStep(c, "db.upsertShop", () =>
      upsertShop(getOracleClient(c), {
        shop,
        // Use safe placeholders; background task will replace them if getShopInfo works.
        shopId: shop,
        shopName: shop,
        accessToken: tokenRes.accessToken,
        scopes: tokenRes.scope,
        installedAt: nowIso(),
      }),
    );
  } catch (err) {
    logEvent(c, "error", "oauth.db_upsert_failed", { error: safeError(err) });
    return c.text("Failed to persist shop installation (check server logs)", 500);
  }

  // 3) Post-install tasks should never block redirect (run in background)
  const requestId = (c.get("requestId") ?? "unknown") as string;
  const flowId = (c.get("flowId") ?? requestId) as string;

  c.executionCtx.waitUntil(
    (async () => {
      // Try to fetch real shop id/name and update DB (best-effort)
      try {
        const info = await getShopInfo({
          shop,
          accessToken: tokenRes.accessToken,
          apiVersion: c.env.SHOPIFY_API_VERSION,
        });

        await upsertShop(getOracleClient(c), {
          shop,
          shopId: info.shopId,
          shopName: info.name,
          accessToken: tokenRes.accessToken,
          scopes: tokenRes.scope,
          installedAt: nowIso(),
        });
      } catch (err) {
        console.error(
          JSON.stringify({
            ts: new Date().toISOString(),
            level: "error",
            msg: "post_install.getShopInfo_failed",
            requestId,
            flowId,
            error: safeError(err),
          }),
        );
      }

      // Register app/uninstalled webhook (best-effort)
      try {
        await registerAppUninstalledWebhook({
          shop,
          accessToken: tokenRes.accessToken,
          apiVersion: c.env.SHOPIFY_API_VERSION,
          callbackUrl: `${c.env.SHOPIFY_APP_URL}/webhooks/app_uninstalled`,
        });
      } catch (err: any) {
        const msg = String(err?.message || err);
        if (!msg.includes("Address for this topic has already been taken")) {
          console.error(
            JSON.stringify({
              ts: new Date().toISOString(),
              level: "error",
              msg: "post_install.webhook_registration_failed",
              requestId,
              flowId,
              error: safeError(err),
            }),
          );
        }
      }
    })(),
  );

  // 4) NOW it is safe to clear the state cookie
  deleteCookie(c, OAUTH_STATE_COOKIE, { path: "/" });

  // 5) Redirect back into embedded app
  return c.redirect(
    `${c.env.SHOPIFY_APP_URL}/?shop=${encodeURIComponent(shop)}&host=${encodeURIComponent(host)}`,
    302,
  );
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
      await logWebhookEvent(getOracleClient(c), {
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
      await markShopUninstalled(getOracleClient(c), shop, nowIso());

      // Best-effort cleanup: unregister merchant + delete custom hostname.
      const md = await getMerchantDomainByShop(getOracleClient(c), shop);
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
          await updateMerchantDomainAppleStatus(getOracleClient(c), {
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

    await logWebhookEvent(getOracleClient(c), {
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
    await logWebhookEvent(getOracleClient(c), {
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

// Session-authenticated API: get shop info
app.get("/api/shop", requireShopifySession, async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text("Not Found", 404);

  const { shop } = getShopifySession(c);

  const shopRow = await withStep(c, "db.getShopByShop", () => getShopByShop(getOracleClient(c), shop));
  if (!shopRow || shopRow.uninstalled_at) {
    return c.json({ error: "App not installed for this shop" }, 401);
  }

  const out: ShopInfoApi = {
    shop,
    shopId: shopRow.shop_id,
    shopName: shopRow.shop_name,
    primaryDomain: null, // we can re-add later if needed
  };

  return c.json(out, 200, { ...noStoreHeaders() });
});


// Session-authenticated API: current Apple Pay status
app.get('/api/applepay/status', requireShopifySession, async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text('Not Found', 404);

  const { shop } = getShopifySession(c);
  const shopRow = await withStep(c, 'db.getShopByShop', () =>
    getShopByShop(getOracleClient(c), shop)
  );
  if (!shopRow || shopRow.uninstalled_at) {
    return c.json({ error: 'App not installed for this shop' }, 401);
  }

  const requestedDomain = (c.req.query('domain') || '').trim().toLowerCase();
  let md = await withStep(c, 'db.getMerchantDomain', async () => {
    if (requestedDomain) {
      const byDomain = await getMerchantDomainByDomain(getOracleClient(c), requestedDomain);
      if (byDomain && byDomain.shop === shop) return byDomain;
    }
    return await getMerchantDomainByShop(getOracleClient(c), shop);
  });

  return c.json(toApplePayStatus(md), 200, { ...noStoreHeaders() });
});

// Session-authenticated API: list all domains for this shop
app.get('/api/applepay/domains', requireShopifySession, async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text('Not Found', 404);

  const { shop } = getShopifySession(c);
  const shopRow = await withStep(c, 'db.getShopByShop', () =>
    getShopByShop(getOracleClient(c), shop)
  );
  if (!shopRow || shopRow.uninstalled_at) {
    return c.json({ error: 'App not installed for this shop' }, 401);
  }

  const rows = await withStep(c, 'db.listMerchantDomainsByShop', () =>
    listMerchantDomainsByShop(getOracleClient(c), shop)
  );

  const domains = rows.map((row) => {
    const dnsInstructions = dnsInstructionsFor(row.domain, c.env.CF_SAAS_CNAME_TARGET);
    // toApplePayStatus already exposes key fields (status, cf status, lastError, etc.)
    const base = toApplePayStatus(row, dnsInstructions) as any;

    return {
      ...base,
      // extra details for the details sidebar
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      cloudflareHostnameId: row.cloudflare_hostname_id,
    };
  });

  return c.json({ ok: true, domains }, 200, { ...noStoreHeaders() });
});


// Session-authenticated API: onboard (domain verification + registerMerchant)
app.post('/api/applepay/onboard', requireShopifySession, async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text('Not Found', 404);

  const { shop } = getShopifySession(c);
  const shopRow = await getShopByShop(getOracleClient(c), shop);
  if (!shopRow || shopRow.uninstalled_at) {
    return c.json({ error: 'App not installed for this shop' }, 401);
  }

  // Fetch freshest info from Shopify (still needed for partnerMerchantName)
  const info = await getShopInfo({
    shop,
    accessToken: shopRow.access_token,
    apiVersion: c.env.SHOPIFY_API_VERSION,
  });

  // ✅ NEW: read optional domain from body
  const body = await c.req.json().catch(() => ({} as any));
  const requested = typeof body?.domain === 'string' ? body.domain : '';

  // Coerce into a hostname
  const domain = coerceHostname(requested || info.primaryDomainHost || '');
  if (!domain || domain.endsWith('.myshopify.com')) {
    return c.json({ error: 'A custom domain is required (not *.myshopify.com)' }, 400);
  }

  const dnsInstructions = dnsInstructionsFor(domain, c.env.CF_SAAS_CNAME_TARGET);

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
    await upsertMerchantDomain(getOracleClient(c), {
      shop,
      shopId: shopRow.shop_id,
      domain,
      partnerInternalMerchantIdentifier: shopRow.shop_id,
      partnerMerchantName: info.name,
      encryptTo: c.env.APPLE_ENCRYPT_TO,
      environment: c.env.APPLE_ENV,
      status: 'ERROR',
      cloudflareHostnameId: null,
      cloudflareHostnameStatus: null,
      cloudflareSslStatus: null,
      lastError: e?.message || String(e),
      appleLastCheckedAt: null,
    });

    const md = await getMerchantDomainByDomain(getOracleClient(c), domain);
    return c.json(toApplePayStatus(md, dnsInstructions), 200, { ...noStoreHeaders() });
  }

  // ✅ mark as in-process
  await upsertMerchantDomain(getOracleClient(c), {
    shop,
    shopId: shopRow.shop_id,
    domain,
    partnerInternalMerchantIdentifier: shopRow.shop_id,
    partnerMerchantName: info.name,
    encryptTo: c.env.APPLE_ENCRYPT_TO,
    environment: c.env.APPLE_ENV,
    status: 'PENDING',
    cloudflareHostnameId: ch?.id || null,
    cloudflareHostnameStatus: ch?.status || null,
    cloudflareSslStatus: ch?.ssl?.status || null,
    lastError: null,
    appleLastCheckedAt: null,
  });

  // ✅ NO PREFLIGHT GATE: try Apple registration immediately on submit
  try {
    await registerMerchant({
      fetcher: c.env.APPLE_MTLS,
      appleEnv: c.env.APPLE_ENV,
      useJwt: c.env.APPLE_USE_JWT === 'true',
      issuer: c.env.APPLE_ENCRYPT_TO,
      certificatePem: c.env.APPLE_JWT_CERT_PEM,
      privateKeyPem: c.env.APPLE_JWT_PRIVATE_KEY_PEM,
      domain: domain,
      partnerMerchantName: info.name,
      partnerInternalMerchantIdentifier: shopRow.shop_id,
      encryptTo: c.env.APPLE_ENCRYPT_TO,
    });

    await updateMerchantDomainAppleStatus(getOracleClient(c), {
      domain,
      status: 'VERIFIED',
      lastError: null,
      appleLastCheckedAt: nowIso(),
    });
  } catch (e: any) {
    const message = e?.message || String(e);

    // Heuristic: if this smells like verification/DNS, mark DNS_NOT_CONFIGURED; else ERROR.
    const dnsish =
      /merchantid-domain-association|verification|dns|http\s*404|http\s*522/i.test(message);

    await updateMerchantDomainAppleStatus(getOracleClient(c), {
      domain,
      status: dnsish ? 'DNS_NOT_CONFIGURED' : 'ERROR',
      lastError: message,
      appleLastCheckedAt: nowIso(),
    });
  }

  const md = await getMerchantDomainByDomain(getOracleClient(c), domain);
  return c.json(toApplePayStatus(md, dnsInstructions), 200, { ...noStoreHeaders() });
});

// Helper (place near other small helpers in this file)
function coerceHostname(input: string): string {
  const raw = String(input || '').trim();
  if (!raw) return '';
  try {
    const u = raw.includes('://') ? new URL(raw) : new URL(`https://${raw}`);
    return normalizeHostname(u.hostname);
  } catch {
    // fallback: strip path/query
    return normalizeHostname(raw.split(/[/?#]/)[0] || '');
  }
}


// Session-authenticated API: check merchant details (debug)
app.post('/api/applepay/check', requireShopifySession, async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.text('Not Found', 404);

  const { shop } = getShopifySession(c);
  const shopRow = await withStep(c, 'db.getShopByShop', () =>
    getShopByShop(getOracleClient(c), shop)
  );
  if (!shopRow || shopRow.uninstalled_at) {
    return c.json({ error: 'App not installed for this shop' }, 401);
  }

  const md = await withStep(c, 'db.getMerchantDomainByShop', () =>
    getMerchantDomainByShop(getOracleClient(c), shop)
  );
  if (!md) return c.json(toApplePayStatus(null), 200, { ...noStoreHeaders() });

  try {
    const details = await withStep(c, 'apple.getMerchantDetails', () =>
      getMerchantDetails({
        fetcher: c.env.APPLE_MTLS,
        appleEnv: c.env.APPLE_ENV,
        merchantIdentifier: md.partner_internal_merchant_identifier,
        useJwt: c.env.APPLE_USE_JWT === 'true',
        issuer: c.env.APPLE_ENCRYPT_TO,
        certificatePem: c.env.APPLE_JWT_CERT_PEM,
        privateKeyPem: c.env.APPLE_JWT_PRIVATE_KEY_PEM,
      })
    );
    // We don’t have a formal status field; treat successful fetch as healthy.
    await withStep(c, 'db.updateMerchantDomainAppleStatus', () =>
      updateMerchantDomainAppleStatus(getOracleClient(c), {
        domain: md.domain,
        status: md.status,
        lastError: null,
        appleLastCheckedAt: nowIso(),
      })
    );
    return c.json(
      {
        ...toApplePayStatus(await getMerchantDomainByShop(getOracleClient(c), shop)),
        details,
      },
      200,
      { ...noStoreHeaders() },
    );
  } catch (e: any) {
    await withStep(c, 'db.updateMerchantDomainAppleStatus', () =>
      updateMerchantDomainAppleStatus(getOracleClient(c), {
        domain: md.domain,
        status: 'ERROR',
        lastError: e?.message || String(e),
        appleLastCheckedAt: nowIso(),
      })
    );
    return c.json(toApplePayStatus(await getMerchantDomainByShop(getOracleClient(c), shop)), 200, { ...noStoreHeaders() });
  }
});

// -----------------------------------------------------------------------------
// Static assets (admin UI)
// -----------------------------------------------------------------------------

app.all('*', async (c) => {
  const u = new URL(c.req.url);

  // ---------------------------------------------------------------------------
  // Merchant domain traffic (custom hostnames)
  // ---------------------------------------------------------------------------
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
        const existing = await withStep(c, 'db.getShopByShop', () =>
          getShopByShop(getOracleClient(c), shop)
        );
        if (!existing || existing.uninstalled_at) {
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

// --- Your Existing Logic (Wrapped in a variable) ---
const handler = {
  // ✅ Always forward env + ctx into Hono (prevents getOracleClient(c) being undefined)
  fetch: (request: Request, env: Env, ctx: ExecutionContext) => {
    return app.fetch(request, env, ctx);
  },

  scheduled: (_controller: ScheduledController, _env: Env, _ctx: ExecutionContext) => {
    console.log("Cron trigger fired");
  },
};

// --- The Final Export ---
export default handler;

