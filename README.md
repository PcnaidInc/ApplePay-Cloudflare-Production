# Apple Pay Shopify App — Cloudflare Production Monorepo

This repo replaces the legacy Azure Function “control plane” with a Cloudflare Worker + D1 + KV stack.

## What this repo contains

## Authentication & Security

This app uses **Shopify App Bridge v4** with standardized session token authentication:

### Frontend (Admin UI)
- **App Bridge v4**: Loaded via CDN script tag in `index.html`
- **Automatic Token Injection**: App Bridge v4 automatically injects session tokens into `fetch()` requests
- **No Manual Init**: No Provider, no `createApp()`, just plain `fetch()` calls
- **API Client**: Unified client at `apps/admin-ui/src/api/client.ts` for consistent error handling

### Backend (Control Plane)
- **Session Token Middleware**: All `/api/*` routes are protected by `requireShopifySession` middleware
- **JWT Verification**: Validates session tokens using HS256 with `SHOPIFY_API_SECRET`
- **Shop Extraction**: Automatically extracts shop domain from token payload
- **401 + Retry Header**: Returns `X-Shopify-Retry-Invalid-Session-Request: 1` on invalid tokens to trigger App Bridge token refresh
- **Public Routes**: `/api/config`, `/.well-known/*`, `/auth/*`, and `/webhooks/*` are exempt from session auth

### Protected Endpoints
- `GET /api/shop` - Get shop information
- `GET /api/applepay/status` - Get Apple Pay domain status
- `GET /api/applepay/domains` - List all domains for shop
- `POST /api/applepay/onboard` - Onboard a new domain
- `POST /api/applepay/check` - Check merchant details (debug)

### Testing Authentication
1. **Valid Session**: Navigate to the app in Shopify Admin. The UI should load without errors.
2. **API Calls**: All protected endpoints should return `200 OK` with valid data.
3. **Invalid/Missing Token**: Use `curl` to make a request to a protected endpoint without a valid session token. The server should respond with `401 Unauthorized` and the `X-Shopify-Retry-Invalid-Session-Request: 1` header.

   ```bash
   # Example: Missing token
   curl -i https://pcnaid-edge.com/api/shop


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
