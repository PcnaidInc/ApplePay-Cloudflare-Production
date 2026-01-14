# Data model (D1)

This repo uses a D1 database with two primary tables.

## `shops`

One row per installed Shopify shop.

Key fields:
- `shop`: `{shop}.myshopify.com`
- `shop_id`: GraphQL shop id (gid)
- `access_token`: Shopify Admin API access token
- `uninstalled_at`: if set, the app is no longer installed

## `merchant_domains`

One row per verified/onboarded domain.

Key fields:
- `domain`: merchant custom domain (unique)
- `partner_internal_merchant_identifier`: **what we register with Apple** and later use as `merchantIdentifier` in the Apple Pay merchant validation session request
- `encrypt_to`: Payment Platform Integrator ID
- `status`: `NOT_STARTED | DNS_NOT_CONFIGURED | PENDING | VERIFIED | ERROR | UNREGISTERED`
- `cloudflare_hostname_id/status`: optional, if you use the Cloudflare custom hostname API

## `webhook_events`

Audit log for received Shopify webhooks (topic + payload hash + timestamp).
