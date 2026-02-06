# Apple Pay Shopify App — Cloudflare Production Monorepo

This repo contains a Cloudflare Worker + Oracle + KV stack for Apple Pay domain registration.

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
  - Persists state in Oracle Autonomous AI Database via ORDS (REST)

- **apps/admin-ui**: A Shopify-embedded admin UI (React + Polaris) used to onboard / view status.

## Database: Oracle Autonomous AI Database

This app uses **Oracle Autonomous AI Database** (formerly used Cloudflare D1) for persistent storage:

- **Connection Method**: ORDS (Oracle REST Data Services) over HTTPS
- **No Native Drivers**: Pure fetch-based SQL execution from Workers
- **Tables**: `shops`, `merchant_domains`, `webhook_events`
- **Migrations**: Manual SQL scripts in `apps/control-plane/oracle-migrations/`

### Setting up Oracle Database

1. **Provision Oracle Autonomous AI Database** (free tier: 2 ECPUs, 20GB)
2. **Enable ORDS** (Database Actions)
3. **Run migrations** (see `apps/control-plane/oracle-migrations/README.md`):
   ```bash
   # Via Database Actions SQL Worksheet or SQLcl
   @apps/control-plane/oracle-migrations/001_initial_schema.sql
   ```
4. **Configure Worker secrets** (ORDS credentials):
   ```bash
   wrangler secret put ORDS_USERNAME
   wrangler secret put ORDS_PASSWORD
   ```
5. **Update wrangler.jsonc** with your ORDS base URL and schema alias


## Quick deploy (Cloudflare)

1. Install dependencies
   - `npm install`

2. Build UI
   - `npm -w apps/admin-ui run build`

3. Configure Oracle Database (see above section)

4. Configure Worker secrets + vars (see `docs/03_DEPLOYMENT.md`)
   ```bash
   # Required Oracle secrets
   wrangler secret put ORDS_USERNAME
   wrangler secret put ORDS_PASSWORD
   
   # Required Shopify secrets
   wrangler secret put SHOPIFY_API_SECRET
   wrangler secret put CF_API_TOKEN
   wrangler secret put APPLE_JWT_CERT_PEM
   wrangler secret put APPLE_JWT_PRIVATE_KEY_PEM
   ```

5. Update `wrangler.jsonc` with your ORDS_BASE_URL and ORDS_SCHEMA_ALIAS
6. Seed KV with the Apple partner verification file
   - `VERIFY_FILE_PATH=/absolute/path/to/apple-developer-merchantid-domain-association npm -w apps/control-plane run kv:seed`

7. Deploy
   - `npm -w apps/control-plane run deploy`

## Docs

- `docs/00_OVERVIEW.md`
- `docs/01_FLOWS.md`
- `docs/02_DATA_MODEL.md`
- `docs/03_DEPLOYMENT.md`
- `docs/04_LEGACY_ANALYSIS.md`
- `apps/control-plane/oracle-migrations/README.md` - Database setup and migration guide
