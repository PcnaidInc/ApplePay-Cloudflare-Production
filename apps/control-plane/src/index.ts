import { Hono } from 'hono';
import { z } from 'zod';

import { parseCookies, serializeCookie } from './lib/cookies';
import { verifyShopifyHmac } from './lib/shopifyHmac';
import {
  buildShopifyAuthorizeUrl,
  exchangeAccessToken,
  getShopInfo,
  registerWebhookAppUninstalled,
  isValidShopDomain,
} from './lib/shopify';
import {
  getShopByShop,
  logWebhookEvent,
  markShopUninstalled,
  upsertMerchantDomain,
  upsertShop,
  getMerchantDomainByShop,
  getMerchantDomainByDomain,
  updateMerchantDomainAppleStatus,
  updateMerchantDomainCloudflareStatus,
} from './lib/db';
import { verifyShopifySessionToken } from './lib/shopifySessionToken';
import { createCustomHostname, deleteCustomHostname, findCustomHostnameByHostname } from './lib/cloudflare';
import { getMerchantDetails, registerMerchant, createPaymentSession, unregisterMerchant, getApplePayBaseUrl } from './lib/apple';

export interface Env {
  DB: D1Database;
  APPLEPAY_KV: KVNamespace;
  ASSETS: Fetcher;
  APPLE_MTLS: Fetcher;

  SHOPIFY_API_KEY: string;
  SHOPIFY_API_SECRET: string;
  SHOPIFY_SCOPES: string;
  SHOPIFY_APP_URL: string;
  SHOPIFY_API_VERSION: string;

  CF_API_TOKEN: string;
  CF_ZONE_ID: string;
  CF_SAAS_CNAME_TARGET: string;

  APPLE_ENV: 'production' | 'sandbox';
  APPLE_ENCRYPT_TO: string;
  APPLE_USE_JWT: 'true' | 'false';
  APPLE_JWT_CERT_PEM: string;
  APPLE_JWT_PRIVATE_KEY_PEM: string;
  APPLE_VERIFICATION_KV_KEY: string;

  LOG_LEVEL?: string;
}

const app = new Hono<{ Bindings: Env }>();

function appHostname(env: Env): string {
  const u = new URL(env.SHOPIFY_APP_URL);
  return u.hostname;
}

function isAppHost(env: Env, requestUrl: URL): boolean {
  return requestUrl.hostname === appHostname(env);
}

function json<T>(data: T, init: ResponseInit = {}): Response {
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json; charset=utf-8');
  return new Response(JSON.stringify(data), { ...init, headers });
}

function text(data: string, init: ResponseInit = {}): Response {
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'text/plain; charset=utf-8');
  return new Response(data, { ...init, headers });
}

function nowIso(): string {
  return new Date().toISOString();
}

function normalizeDomain(host: string): string {
  return host.toLowerCase().replace(/\.$/, '');
}

async function requireSession(c: any) {
  const auth = c.req.header('Authorization');
  if (!auth?.startsWith('Bearer ')) return c.json({ ok: false, error: 'Missing Authorization header' }, 401);
  const token = auth.slice('Bearer '.length);
  const payload = await verifyShopifySessionToken({
    token,
    apiKey: c.env.SHOPIFY_API_KEY,
    apiSecret: c.env.SHOPIFY_API_SECRET,
  });
  return payload;
}

// --- Merchant-domain routes (these can run on ANY hostname) ---

app.get('/.well-known/apple-developer-merchantid-domain-association', async (c) => {
  const key = c.env.APPLE_VERIFICATION_KV_KEY || 'applepay:partner-verification-file';
  const body = await c.env.APPLEPAY_KV.get(key);
  if (!body) {
    return text('Partner verification file missing from KV.', { status: 500 });
  }
  return text(body, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=300',
    },
  });
});

const ApplePaySessionRequestSchema = z.object({
  validationURL: z.string().url(),
});

app.options('/applepay/session', (c) => {
  const origin = c.req.header('Origin') ?? '*';
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
});

app.post('/applepay/session', async (c) => {
  const url = new URL(c.req.url);
  const host = normalizeDomain(url.hostname);

  // This endpoint is intended to be called from the merchant storefront.
  // We look up the merchant by domain.
  const merchant = await getMerchantDomainByDomain(c.env.DB, host);
  if (!merchant) {
    return json({ ok: false, error: `Domain not onboarded: ${host}` }, { status: 404 });
  }

  const origin = c.req.header('Origin') ?? '';
  // If the Origin header is present, require it to match the current host.
  if (origin) {
    try {
      const o = new URL(origin);
      if (normalizeDomain(o.hostname) !== host) {
        return json({ ok: false, error: 'Origin mismatch.' }, { status: 403 });
      }
    } catch {
      return json({ ok: false, error: 'Invalid Origin header.' }, { status: 400 });
    }
  }

  const body = await c.req.json().catch(() => null);
  const parsed = ApplePaySessionRequestSchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }

  // Apple requires that we ONLY call validation URLs provided by Apple.
  const validationUrl = new URL(parsed.data.validationURL);
  if (!/apple\.com$/i.test(validationUrl.hostname) || !/apple-pay-gateway/i.test(validationUrl.hostname)) {
    return json({ ok: false, error: 'validationURL host is not allowed.' }, { status: 400 });
  }

  const displayName = merchant.partner_merchant_name;
  const merchantIdentifier = merchant.partner_internal_merchant_identifier;

  const session = await createPaymentSession(c.env, {
    validationURL: parsed.data.validationURL,
    merchantIdentifier,
    displayName,
    initiativeContext: host,
  });

  const resp = json(session, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Cache-Control': 'no-store',
    },
  });
  return resp;
});

// --- App-host-only routes ---

app.get('/api/config', async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return json({ ok: false, error: 'Not found' }, { status: 404 });

  return json({
    ok: true,
    config: {
      shopifyApiKey: c.env.SHOPIFY_API_KEY,
      appUrl: c.env.SHOPIFY_APP_URL,
    },
  });
});

app.get('/auth', async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return c.redirect(c.env.SHOPIFY_APP_URL);

  const shop = u.searchParams.get('shop') ?? '';
  const host = u.searchParams.get('host') ?? '';
  if (!isValidShopDomain(shop) || !host) {
    return json({ ok: false, error: 'Missing or invalid shop/host' }, { status: 400 });
  }

  const state = crypto.randomUUID();
  const redirectUri = new URL('/auth/callback', c.env.SHOPIFY_APP_URL).toString();
  const authorizeUrl = buildShopifyAuthorizeUrl({
    shop,
    apiKey: c.env.SHOPIFY_API_KEY,
    scopes: c.env.SHOPIFY_SCOPES,
    redirectUri,
    state,
  });

  const cookie = serializeCookie('oauth_state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    path: '/auth/callback',
    maxAge: 300,
  });

  return c.redirect(authorizeUrl, 302, {
    'Set-Cookie': cookie,
  });
});

app.get('/auth/callback', async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return json({ ok: false, error: 'Not found' }, { status: 404 });

  const okHmac = await verifyShopifyHmac({ url: u, apiSecret: c.env.SHOPIFY_API_SECRET });
  if (!okHmac) {
    return json({ ok: false, error: 'HMAC verification failed' }, { status: 400 });
  }

  const shop = u.searchParams.get('shop') ?? '';
  const code = u.searchParams.get('code') ?? '';
  const state = u.searchParams.get('state') ?? '';
  const host = u.searchParams.get('host') ?? '';

  if (!isValidShopDomain(shop) || !code || !state || !host) {
    return json({ ok: false, error: 'Missing required OAuth params' }, { status: 400 });
  }

  const cookies = parseCookies(c.req.header('Cookie') ?? null);
  if (cookies.oauth_state !== state) {
    return json({ ok: false, error: 'Invalid OAuth state' }, { status: 400 });
  }

  const { access_token, scope } = await exchangeAccessToken({
    shop,
    apiKey: c.env.SHOPIFY_API_KEY,
    apiSecret: c.env.SHOPIFY_API_SECRET,
    code,
  });

  const info = await getShopInfo({
    shop,
    accessToken: access_token,
    apiVersion: c.env.SHOPIFY_API_VERSION,
  });

  await upsertShop(c.env.DB, {
    shop,
    shopId: info.id,
    shopName: info.name,
    accessToken: access_token,
    scopes: scope,
    installedAt: nowIso(),
  });

  // Register APP_UNINSTALLED webhook
  try {
    await registerWebhookAppUninstalled({
      shop,
      accessToken: access_token,
      apiVersion: c.env.SHOPIFY_API_VERSION,
      callbackUrl: new URL('/webhooks/shopify/app-uninstalled', c.env.SHOPIFY_APP_URL).toString(),
    });
  } catch (e) {
    // Non-fatal; webhooks can be re-registered later
    console.warn('Failed to register webhook:', e);
  }

  // Clear state cookie
  const clearCookie = serializeCookie('oauth_state', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    path: '/auth/callback',
    maxAge: 0,
  });

  const redirectToApp = new URL(c.env.SHOPIFY_APP_URL);
  redirectToApp.searchParams.set('shop', shop);
  redirectToApp.searchParams.set('host', host);

  return c.redirect(redirectToApp.toString(), 302, {
    'Set-Cookie': clearCookie,
  });
});

// Authenticated API: shop info
app.get('/api/shop', async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return json({ ok: false, error: 'Not found' }, { status: 404 });

  const payload = await requireSession(c);
  if (!payload || payload instanceof Response) return payload;

  const shop = normalizeDomain(new URL(payload.dest).hostname);
  if (!isValidShopDomain(shop)) return json({ ok: false, error: 'Invalid shop' }, { status: 400 });

  const row = await getShopByShop(c.env.DB, shop);
  if (!row || row.uninstalled_at) {
    return json({ ok: false, error: 'Shop not installed' }, { status: 401 });
  }

  // Refresh shop info from Shopify (domain can change)
  const info = await getShopInfo({
    shop,
    accessToken: row.access_token,
    apiVersion: c.env.SHOPIFY_API_VERSION,
  });

  return json({
    ok: true,
    shop: {
      shop,
      id: info.id,
      name: info.name,
      primaryDomain: info.primaryDomain,
    },
  });
});

app.get('/api/applepay/status', async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return json({ ok: false, error: 'Not found' }, { status: 404 });

  const payload = await requireSession(c);
  if (!payload || payload instanceof Response) return payload;

  const shop = normalizeDomain(new URL(payload.dest).hostname);
  const row = await getMerchantDomainByShop(c.env.DB, shop);
  return json({ ok: true, merchant: row });
});

const OnboardRequestSchema = z.object({
  force: z.boolean().optional(),
});

app.post('/api/applepay/onboard', async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return json({ ok: false, error: 'Not found' }, { status: 404 });

  const payload = await requireSession(c);
  if (!payload || payload instanceof Response) return payload;
  const shop = normalizeDomain(new URL(payload.dest).hostname);

  const shopRow = await getShopByShop(c.env.DB, shop);
  if (!shopRow || shopRow.uninstalled_at) {
    return json({ ok: false, error: 'Shop not installed' }, { status: 401 });
  }

  const body = await c.req.json().catch(() => ({}));
  const parsedBody = OnboardRequestSchema.safeParse(body);
  if (!parsedBody.success) {
    return json({ ok: false, error: parsedBody.error.flatten() }, { status: 400 });
  }

  const info = await getShopInfo({
    shop,
    accessToken: shopRow.access_token,
    apiVersion: c.env.SHOPIFY_API_VERSION,
  });

  const domain = normalizeDomain(info.primaryDomain);
  if (domain.endsWith('.myshopify.com')) {
    return json({
      ok: false,
      error:
        'Your store does not have a custom domain set as its primary domain. Apple Pay domain verification requires a custom domain.',
    }, { status: 400 });
  }

  // 1) Ensure Cloudflare custom hostname exists
  let cf = await findCustomHostnameByHostname(c.env, domain);
  if (!cf) {
    cf = await createCustomHostname(c.env, domain);
  }

  await updateMerchantDomainCloudflareStatus(c.env.DB, {
    shop,
    domain,
    hostnameId: cf.id,
    hostnameStatus: cf.status,
    sslStatus: cf.ssl?.status ?? null,
    lastError: cf.ssl?.validation_errors?.length ? JSON.stringify(cf.ssl.validation_errors) : null,
  });

  // 2) Preflight: can we fetch the verification file over HTTPS from the domain?
  const key = c.env.APPLE_VERIFICATION_KV_KEY || 'applepay:partner-verification-file';
  const expectedFile = await c.env.APPLEPAY_KV.get(key);
  if (!expectedFile) {
    return json({ ok: false, error: 'Verification file missing from KV.' }, { status: 500 });
  }

  let verificationOk = false;
  try {
    const res = await fetch(`https://${domain}/.well-known/apple-developer-merchantid-domain-association`, {
      redirect: 'manual',
    });
    const textBody = await res.text();
    verificationOk = res.ok && textBody.trim() === expectedFile.trim();
  } catch {
    verificationOk = false;
  }

  // Save/Upsert merchant domain row
  const partnerInternalMerchantIdentifier = info.id; // stable Shopify Shop GID
  const partnerMerchantName = info.name;

  await upsertMerchantDomain(c.env.DB, {
    shop,
    shopId: info.id,
    domain,
    partnerInternalMerchantIdentifier,
    partnerMerchantName,
    encryptTo: c.env.APPLE_ENCRYPT_TO,
    environment: c.env.APPLE_ENV,
    status: verificationOk ? 'PENDING' : 'DNS_NOT_CONFIGURED',
    cloudflareHostnameId: cf.id,
    cloudflareHostnameStatus: cf.status,
    cloudflareSslStatus: cf.ssl?.status ?? null,
    lastError: verificationOk ? null : 'Verification file not accessible yet. Update DNS and wait for SSL to be active.',
  });

  if (!verificationOk) {
    return json({
      ok: true,
      step: 'dns',
      message: 'DNS is not pointing to Cloudflare yet (or SSL not active). Configure DNS and retry.',
      domain,
      dns: {
        type: domain.split('.').length === 2 ? 'ALIAS/CNAME (apex)' : 'CNAME',
        name: domain,
        target: c.env.CF_SAAS_CNAME_TARGET,
      },
      cloudflare: {
        customHostnameId: cf.id,
        status: cf.status,
        sslStatus: cf.ssl?.status ?? null,
        validationRecords: cf.ssl?.validation_records ?? [],
      },
    });
  }

  // 3) Call Apple registerMerchant
  try {
    await registerMerchant(c.env, {
      domainNames: [domain],
      partnerInternalMerchantIdentifier,
      partnerMerchantName,
      encryptTo: c.env.APPLE_ENCRYPT_TO,
    });
  } catch (e: any) {
    await updateMerchantDomainAppleStatus(c.env.DB, {
      shop,
      domain,
      status: 'ERROR',
      lastError: `Apple registerMerchant failed: ${e?.message ?? String(e)}`,
      appleLastCheckedAt: nowIso(),
    });
    return json({ ok: false, error: `Apple registerMerchant failed: ${e?.message ?? String(e)}` }, { status: 502 });
  }

  // 4) Fetch merchant details once (best-effort)
  let details: any = null;
  try {
    details = await getMerchantDetails(c.env, partnerInternalMerchantIdentifier);
    // Some docs use fields like status/domainNames etc.
  } catch {
    details = null;
  }

  await updateMerchantDomainAppleStatus(c.env.DB, {
    shop,
    domain,
    status: 'PENDING',
    lastError: null,
    appleLastCheckedAt: nowIso(),
  });

  return json({
    ok: true,
    step: 'apple',
    message: 'Merchant registration submitted to Apple. Apple will verify the domain by fetching the /.well-known file.',
    domain,
    merchantIdentifier: partnerInternalMerchantIdentifier,
    appleDetails: details,
    appleBaseUrl: getApplePayBaseUrl(c.env.APPLE_ENV),
  });
});

app.post('/api/applepay/check', async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return json({ ok: false, error: 'Not found' }, { status: 404 });

  const payload = await requireSession(c);
  if (!payload || payload instanceof Response) return payload;
  const shop = normalizeDomain(new URL(payload.dest).hostname);

  const row = await getMerchantDomainByShop(c.env.DB, shop);
  if (!row) return json({ ok: false, error: 'No merchant onboarded yet.' }, { status: 404 });

  let details: any;
  try {
    details = await getMerchantDetails(c.env, row.partner_internal_merchant_identifier);
  } catch (e: any) {
    await updateMerchantDomainAppleStatus(c.env.DB, {
      shop,
      domain: row.domain,
      status: 'ERROR',
      lastError: `Apple getMerchantDetails failed: ${e?.message ?? String(e)}`,
      appleLastCheckedAt: nowIso(),
    });
    return json({ ok: false, error: `Apple getMerchantDetails failed: ${e?.message ?? String(e)}` }, { status: 502 });
  }

  // Very light inference: if details.domains contains VERIFIED, etc. If not present, keep PENDING.
  let status = row.status;
  try {
    const possibleStatus = (details?.status || details?.merchantStatus || '').toString().toUpperCase();
    if (possibleStatus) status = possibleStatus;
  } catch {
    // ignore
  }

  await updateMerchantDomainAppleStatus(c.env.DB, {
    shop,
    domain: row.domain,
    status: status === 'VERIFIED' ? 'VERIFIED' : 'PENDING',
    lastError: null,
    appleLastCheckedAt: nowIso(),
  });

  return json({ ok: true, appleDetails: details });
});

app.post('/api/applepay/unregister', async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return json({ ok: false, error: 'Not found' }, { status: 404 });

  const payload = await requireSession(c);
  if (!payload || payload instanceof Response) return payload;
  const shop = normalizeDomain(new URL(payload.dest).hostname);

  const row = await getMerchantDomainByShop(c.env.DB, shop);
  if (!row) return json({ ok: false, error: 'No merchant onboarded yet.' }, { status: 404 });

  try {
    await unregisterMerchant(c.env, {
      partnerInternalMerchantIdentifier: row.partner_internal_merchant_identifier,
      domainNames: [row.domain],
    });
  } catch (e: any) {
    return json({ ok: false, error: `Apple unregisterMerchant failed: ${e?.message ?? String(e)}` }, { status: 502 });
  }

  // Delete Cloudflare custom hostname (best-effort)
  if (row.cloudflare_custom_hostname_id) {
    try {
      await deleteCustomHostname(c.env, row.cloudflare_custom_hostname_id);
    } catch {
      // ignore
    }
  }

  await updateMerchantDomainAppleStatus(c.env.DB, {
    shop,
    domain: row.domain,
    status: 'UNREGISTERED',
    lastError: null,
    appleLastCheckedAt: nowIso(),
  });

  return json({ ok: true, message: 'Unregistered from Apple and deleted Cloudflare hostname (if any).' });
});

// --- Shopify webhook: APP_UNINSTALLED ---
app.post('/webhooks/shopify/app-uninstalled', async (c) => {
  const u = new URL(c.req.url);
  if (!isAppHost(c.env, u)) return json({ ok: false, error: 'Not found' }, { status: 404 });

  const rawBody = await c.req.text();
  const hmac = c.req.header('X-Shopify-Hmac-Sha256') ?? '';
  const shop = (c.req.header('X-Shopify-Shop-Domain') ?? '').toLowerCase();

  // Verify HMAC (base64) for webhooks
  const computed = await (async () => {
    const key = new TextEncoder().encode(c.env.SHOPIFY_API_SECRET);
    const msg = new TextEncoder().encode(rawBody);
    const cryptoKey = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const sig = await crypto.subtle.sign('HMAC', cryptoKey, msg);
    const bytes = new Uint8Array(sig);
    let binary = '';
    for (const b of bytes) binary += String.fromCharCode(b);
    return btoa(binary);
  })();

  if (computed !== hmac) {
    await logWebhookEvent(c.env.DB, {
      eventType: 'shopify.app_uninstalled',
      shop,
      payload: rawBody,
      receivedAt: nowIso(),
      processedAt: nowIso(),
      status: 'invalid_hmac',
    });
    return json({ ok: false, error: 'Invalid webhook HMAC' }, { status: 401 });
  }

  await logWebhookEvent(c.env.DB, {
    eventType: 'shopify.app_uninstalled',
    shop,
    payload: rawBody,
    receivedAt: nowIso(),
    processedAt: nowIso(),
    status: 'ok',
  });

  await markShopUninstalled(c.env.DB, shop, nowIso());

  // Optionally unregister from Apple & delete hostname
  const merchant = await getMerchantDomainByShop(c.env.DB, shop);
  if (merchant) {
    try {
      await unregisterMerchant(c.env, {
        partnerInternalMerchantIdentifier: merchant.partner_internal_merchant_identifier,
        domainNames: [merchant.domain],
      });
    } catch {
      // ignore
    }

    if (merchant.cloudflare_custom_hostname_id) {
      try {
        await deleteCustomHostname(c.env, merchant.cloudflare_custom_hostname_id);
      } catch {
        // ignore
      }
    }

    await updateMerchantDomainAppleStatus(c.env.DB, {
      shop,
      domain: merchant.domain,
      status: 'UNREGISTERED',
      lastError: null,
      appleLastCheckedAt: nowIso(),
    });
  }

  return json({ ok: true });
});

// --- Asset / pass-through fallback ---
app.all('*', async (c) => {
  const url = new URL(c.req.url);
  const env = c.env;

  // If request is for the app host, serve UI assets.
  if (isAppHost(env, url)) {
    // Allow Shopify admin to iframe the app
    const frameAncestors = [
      `https://${url.searchParams.get('shop') ?? '*.myshopify.com'}`,
      'https://admin.shopify.com',
      'https://*.myshopify.com',
    ];

    const res = await env.ASSETS.fetch(c.req.raw);

    const headers = new Headers(res.headers);
    headers.set('Content-Security-Policy', `frame-ancestors ${frameAncestors.join(' ')};`);
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Referrer-Policy', 'no-referrer');

    // Force index.html for SPA routes if asset missing
    if (res.status === 404) {
      const indexReq = new Request(new URL('/index.html', env.SHOPIFY_APP_URL).toString());
      const indexRes = await env.ASSETS.fetch(indexReq);
      const h2 = new Headers(indexRes.headers);
      h2.set('Content-Security-Policy', `frame-ancestors ${frameAncestors.join(' ')};`);
      h2.set('X-Content-Type-Options', 'nosniff');
      h2.set('Referrer-Policy', 'no-referrer');
      return new Response(indexRes.body, { status: indexRes.status, headers: h2 });
    }

    return new Response(res.body, { status: res.status, headers });
  }

  // For merchant hostnames, pass-through to origin (Shopify) for everything else.
  return fetch(c.req.raw);
});

export default {
  fetch: app.fetch,
  scheduled: async (event: ScheduledEvent, env: Env, ctx: ExecutionContext) => {
    // Daily re-check pending merchants
    ctx.waitUntil(
      (async () => {
        const rows = await env.DB.prepare(
          "SELECT shop, domain, partner_internal_merchant_identifier FROM merchant_domains WHERE status IN ('PENDING','DNS_NOT_CONFIGURED')"
        ).all();

        for (const r of rows.results as any[]) {
          try {
            const details = await getMerchantDetails(env, r.partner_internal_merchant_identifier);
            const possibleStatus = (details?.status || details?.merchantStatus || '').toString().toUpperCase();
            const nextStatus = possibleStatus === 'VERIFIED' ? 'VERIFIED' : 'PENDING';
            await updateMerchantDomainAppleStatus(env.DB, {
              shop: r.shop,
              domain: r.domain,
              status: nextStatus,
              lastError: null,
              appleLastCheckedAt: nowIso(),
            });
          } catch (e: any) {
            await updateMerchantDomainAppleStatus(env.DB, {
              shop: r.shop,
              domain: r.domain,
              status: 'ERROR',
              lastError: `Cron check failed: ${e?.message ?? String(e)}`,
              appleLastCheckedAt: nowIso(),
            });
          }
        }
      })()
    );
  },
};
