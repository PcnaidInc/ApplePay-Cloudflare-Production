# Security & operational notes

## Secrets

Do **not** commit secrets to source control.

In Cloudflare Workers, store secrets using:
- `wrangler secret put ...`

This repo expects the following to be secrets:
- `SHOPIFY_API_SECRET`
- `CF_API_TOKEN`
- `APPLE_JWT_PRIVATE_KEY_PEM` (if you enable JWT auth)
- `APPLE_JWT_CERT_PEM` (if you enable JWT auth)

## Logging

- `/api/*` endpoints intentionally avoid returning raw upstream errors to the frontend.
- The Worker logs useful details to Cloudflare Logs/Observability.

## Rate limiting

For production, consider adding Cloudflare rate limiting rules to:
- `/applepay/session`
- `/api/applepay/*`

## Audit trail

Webhook deliveries are persisted in `webhook_events` in D1.
