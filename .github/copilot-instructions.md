# Copilot Instructions for Apple Pay Shopify App (Cloudflare)

This is a monorepo for a Shopify App that integrates Apple Pay, built on the Cloudflare stack.

## Architecture & Structure
- **Monorepo:** Uses NPM workspaces (`apps/control-plane`, `apps/admin-ui`).
- **Control Plane (`apps/control-plane`):** 
  - **Runtime:** Cloudflare Worker (`src/index.ts` is entry).
  - **Framework:** Hono (`import { Hono } from 'hono'`).
  - **State:** Cloudflare D1 (`DB` binding) for app data, KV (`APPLEPAY_KV`) for the Apple verification file.
  - **Connectivity:** Uses mTLS (`APPLE_MTLS` binding) for Apple Pay API calls.
  - **Routing:** Serves both the Shopify App backend and the merchant domain verification file (`/.well-known/...`).
- **Admin UI (`apps/admin-ui`):**
  - **Stack:** React, Vite, Shopify Polaris, App Bridge.
  - **Build:** Compiles to `dist/`, which is served by the Worker via `ASSETS` binding.

## Critical Workflows
- **Development:**
  - `npm install` (root).
  - `npm -w apps/control-plane run d1:migrate` (init DB).
  - `npm -w apps/control-plane run dev` (start backend).
  - `npm -w apps/admin-ui run dev` (start frontend).
- **Deployment:** 
  - Build UI first: `npm -w apps/admin-ui run build`.
  - Deploy Worker: `npm -w apps/control-plane run deploy`.
- **KV Seeding:** The Apple verification file is static and must be seeded into KV:
  - `VERIFY_FILE_PATH=... npm -w apps/control-plane run kv:seed`

## Code Conventions
- **Bindings:** Access environment variables and bindings via Hono context (`c.env`), defined in `Env` interface (`src/index.ts`).
- **Database:** 
  - Use D1 for all relational data (merchants, shops).
  - Helper functions in `src/lib/db.ts`.
  - Migrations in `migrations/` (.sql files).
- **Authentication:**
  - Shopify App: Use `verifyShopifySessionToken` (Bearer token flow).
  - Middleware: `requireSession(c)` ensures valid Shopify session.
- **Apple Integration:**
  - Logic in `src/lib/apple.ts`.
  - Requires mTLS certificate binding (`APPLE_MTLS`) for `registerMerchant`.
  - `/.well-known/apple-developer-merchantid-domain-association` is served from KV to support generic domain verification.

## Key Configuration Files
- `apps/control-plane/wrangler.jsonc`: Worker bindings (D1, KV, mTLS, vars).
- `apps/control-plane/src/index.ts`: Application entry, routing, and environment type definitions.
- `apps/admin-ui/vite.config.ts`: Frontend build configuration.
