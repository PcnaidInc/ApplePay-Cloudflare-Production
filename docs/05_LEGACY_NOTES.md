# Legacy implementation notes

This repo was built to address several mismatches/inconsistencies observed in the legacy code and documentation.

## 1) The Apple domain verification file is not per-merchant

Apple’s partner/integrator domain verification file is associated with your **Payment Platform Integrator ID** and is reused across merchants.

Therefore:
- There is **no need** to write a *different* verification file per merchant domain
- The runtime backends should **not** be writing to KV at onboarding time

This repo stores a single file under the KV key:
- `applepay:partner-verification-file`

and always serves it for requests to:
- `/.well-known/...`.

## 2) File must exist *before* `registerMerchant`

The Apple docs indicate the verification file must already be hosted on the domain before calling `registerMerchant`.

This repo performs a preflight fetch to ensure the domain is already serving the correct file before calling Apple.

## 3) KV origin lookups are removed

The legacy worker performed `KV.get("{hostname}:origin")` and proxied requests to that origin.

This repo removes that runtime dependency and relies on the Cloudflare zone’s origin configuration (or your SaaS custom hostname fallback origin) for pass-through.
