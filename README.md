# Apple Pay Shopify App — Cloudflare Production Monorepo

This repo replaces the legacy Azure Function “control plane” with a Cloudflare Worker + D1 + KV stack.

## What this repo contains

- **apps/control-plane**: A single Cloudflare Worker that:
  - Serves Apple’s domain verification file at `/.well-known/apple-developer-merchantid-domain-association`
  - Exposes the Shopify embedded app backend (OAuth, API endpoints)
  - Creates Apple Pay merchant registrations (registerMerchant)
  - Provides a same-origin merchant validation endpoint at `/applepay/session`
  - Persists state in Cloudflare D1

- **apps/admin-ui**: A Shopify-embedded admin UI (React + Polaris) used to onboard / view status.

## Quick deploy (Cloudflare)

1. Install dependencies
   - `npm install`

2. Build UI
   - `npm -w apps/admin-ui run build`

3. Configure Worker secrets + vars (see `docs/03_DEPLOYMENT.md`)

4. Run D1 migrations
   - `npm -w apps/control-plane run d1:migrate`

5. Seed KV with the Apple partner verification file
   - `VERIFY_FILE_PATH=/absolute/path/to/apple-developer-merchantid-domain-association npm -w apps/control-plane run kv:seed`

6. Deploy
   - `npm -w apps/control-plane run deploy`

## Docs

- `docs/00_OVERVIEW.md`
- `docs/01_FLOWS.md`
- `docs/02_DATA_MODEL.md`
- `docs/03_DEPLOYMENT.md`
- `docs/04_LEGACY_ANALYSIS.md`
