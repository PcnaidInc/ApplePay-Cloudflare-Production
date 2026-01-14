# End-to-end flows

## Flow A — Merchant installs the Shopify app

1. Merchant opens the app in Shopify Admin.
2. Frontend hits `/auth?shop=...&host=...`.
3. Worker redirects to Shopify OAuth.
4. Shopify redirects to `/auth/callback?...`.
5. Worker verifies HMAC, exchanges code for an access token, stores it in D1, and registers the `APP_UNINSTALLED` webhook.
6. UI loads and begins using session tokens for all API calls.

## Flow B — Merchant clicks “Enable Apple Pay”

1. UI calls `POST /api/applepay/onboard` (with a Shopify session token).
2. Worker fetches shop info from Shopify (name, shop id, primary domain).
3. Worker ensures Cloudflare edge is ready for the domain (optional: create a custom hostname).
4. Worker **preflights** the domain by requesting:

`https://{domain}/.well-known/apple-developer-merchantid-domain-association`

…and verifying that the response body exactly matches the KV verification file.

5. If preflight fails, the Worker stores status `DNS_NOT_CONFIGURED` and returns DNS instructions to the UI.
6. If preflight passes, Worker calls Apple `registerMerchant` for the domain, stores status `PENDING`.
7. UI can poll `GET /api/applepay/status` or click “Refresh status”.

## Flow C — Apple crawls the verification file

Apple repeatedly requests the well-known path on the merchant domain.

- Worker returns the **global** verification file from KV.

## Flow D — Merchant validation (Apple Pay JS)

1. Browser receives `validationURL` from the Apple Pay JS `onvalidatemerchant` event.
2. Browser `POST`s `{ validationUrl: "..." }` to:

`https://{merchantDomain}/applepay/session`

3. Worker looks up `{merchantDomain}` in D1 to get `partner_internal_merchant_identifier`.
4. Worker calls Apple’s validation URL using mTLS and returns the `merchantSession` JSON.

## Flow E — App uninstalled

1. Shopify sends `APP_UNINSTALLED` webhook.
2. Worker verifies webhook HMAC.
3. Worker marks the shop as uninstalled.
4. (Optional) Worker calls Apple `unregisterMerchant` and/or deletes custom hostname.

## Scheduled flow — background status refresh

A Worker cron trigger periodically:
- Finds all merchants in `PENDING`
- Calls Apple `getMerchantDetails`
- Updates status in D1

