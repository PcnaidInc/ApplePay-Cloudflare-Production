# Deployment

## Cloudflare prerequisites

1. A Cloudflare account with Workers enabled.
2. A plan that supports the **Custom Hostnames / SSL for SaaS** feature *if* you intend to onboard merchant domains into your zone.
3. Your **Apple Pay** certificates/keys:
   - The partner domain verification file (provided by Apple for your Payment Platform Integrator ID)
   - The Apple identity certificate + private key used for mutual TLS to Apple Pay Gateway (exportable to PEM)
4. Your Shopify app credentials:
   - API key
   - API secret
   - Embedded app URL (the Worker URL you’ll deploy)

## 1) Install deps

From repo root:

- `npm install`

## 2) Build the admin UI

- `npm -w apps/admin-ui run build`

This produces `apps/admin-ui/dist`.

## 3) Configure the Worker

Deployment config lives in:

- `apps/control-plane/wrangler.jsonc`

You must set:

- `mtls_certificates[0].certificate_id` to the certificate id returned by `wrangler mtls-certificate upload`

## 4) Create & bind the mTLS certificate

In `apps/control-plane`:

1. Convert your Apple identity cert+key to PEM (see `docs/04_CERTS.md`).
2. Upload to Cloudflare:

- `npx wrangler mtls-certificate upload --name applepay-identity --cert ./certs/applepay-cert.pem --key ./certs/applepay-key.pem`

Copy the returned `id` into `wrangler.jsonc`.

## 5) Set secrets

In `apps/control-plane`:

- `npx wrangler secret put SHOPIFY_API_KEY`
- `npx wrangler secret put SHOPIFY_API_SECRET`
- `npx wrangler secret put CF_API_TOKEN`
- `npx wrangler secret put APPLE_JWT_PRIVATE_KEY_PEM` *(only if you keep APPLE_USE_JWT=true)*
- `npx wrangler secret put APPLE_JWT_CERT_PEM` *(only if you keep APPLE_USE_JWT=true)*

…and any other values you need to override.

## 6) Deploy

From `apps/control-plane`:

- `npx wrangler deploy`

## 7) Run D1 migrations

- `npx wrangler d1 migrations apply DB`

## 8) Seed KV with the Apple partner verification file

From `apps/control-plane`:

- `VERIFY_FILE_PATH=./certs/apple-domain-verification-file npm run kv:seed`

## 9) Shopify Partner Dashboard config

Set:

- **App URL**: `https://<your-worker-domain>/`
- **Allowed redirection URLs**:
  - `https://<your-worker-domain>/auth/callback`

Add webhook endpoint:

- `https://<your-worker-domain>/webhooks/shopify`

## 10) Domain onboarding (Cloudflare for SaaS)

The app will attempt to create a custom hostname for the merchant’s primary domain and then asks the merchant to set DNS:

- Apex domain: ALIAS/ANAME (or your DNS provider’s equivalent) to your SaaS target
- Subdomain: CNAME to your SaaS target

Once DNS is in place, the merchant clicks **Retry onboarding** and the app will register the merchant with Apple.
