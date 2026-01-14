# Certificates & key material

## Apple identity certificate for mTLS

Apple gives you a merchant/platform identity certificate that you must present as a **client certificate** when calling Apple Pay Gateway.

Cloudflare Workers support outbound mTLS via an **mTLS Certificate binding**. You upload the certificate+key to Cloudflare and bind it to the Worker.

### Convert a `.pfx` / `.p12` to PEM

If your identity cert is a `.pfx` (common on Windows/.NET), you can convert using OpenSSL:

1. Extract private key (unencrypted, PEM):

- `openssl pkcs12 -in identity.pfx -nocerts -nodes -out applepay-key.pem`

2. Extract certificate (PEM):

- `openssl pkcs12 -in identity.pfx -clcerts -nokeys -out applepay-cert.pem`

Use `applepay-cert.pem` + `applepay-key.pem` with `wrangler mtls-certificate upload`.

## JWT signing keys (optional)

The legacy Azure Functions generate a short-lived JWT and send it as a Bearer token. This Worker supports the same behavior.

If Apple confirms mTLS-only is sufficient in your setup, you can set:

- `APPLE_USE_JWT = "false"`

If you keep JWT enabled, you must provide:

- `APPLE_JWT_PRIVATE_KEY_PEM` (PKCS8 PEM: `-----BEGIN PRIVATE KEY-----`)
- `APPLE_JWT_CERT_PEM` (PEM certificate for `x5c`)

### Convert a PKCS1 key to PKCS8

If your extracted key is PKCS1 (`-----BEGIN RSA PRIVATE KEY-----`), convert:

- `openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in rsa_pkcs1.pem -out pkcs8_private_key.pem`

Use `pkcs8_private_key.pem` for `APPLE_JWT_PRIVATE_KEY_PEM`.
