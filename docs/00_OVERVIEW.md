# Overview

## Goal

Enable Apple Pay on the Web for Shopify merchants by:

1. Serving Apple’s **domain verification file** on the merchant’s domain at:

`/.well-known/apple-developer-merchantid-domain-association`

2. Calling Apple’s **Web Merchant Registration API** to register the merchant domain using your **Payment Platform Integrator ID** (the `encryptTo` field).

3. (Optional, but included) Exposing a **merchant validation** endpoint (`/applepay/session`) that returns the `merchantSession` JSON required by Apple Pay JS.

## Core ideas / simplifications

- **There is only ONE domain verification file per Payment Platform Integrator ID**, and it is reused for all merchant domains registered with that integrator ID.
- The Worker reads that file from **Cloudflare KV** and never writes it at runtime.
- The backend stores merchant onboarding state in **Cloudflare D1**.

## Components

### 1) Cloudflare Worker (single deployment)

Runs on:
- Your app domain (the Shopify embedded app host)
- Any merchant domains you attach this Worker to (via custom hostnames / routes)

Responsibilities:
- Serve verification file.
- Shopify OAuth + webhook receiver.
- Apple API calls (mTLS + optional JWT).
- `/applepay/session` endpoint.

### 2) Cloudflare D1

Holds:
- Shopify install sessions (access token per shop)
- Merchant domain onboarding state + Apple registration status
- Minimal audit log

### 3) Cloudflare KV

Holds:
- `applepay:partner-verification-file` → the raw verification file contents

### 4) Apple assets

- **Payment Platform Integrator ID** (used as `encryptTo`).
- **Merchant Identity Certificate + private key** (used for mTLS to Apple, and optionally for JWT signing).

### 5) Shopify Partner App

- Embedded app using session tokens.
- Scopes: `read_content, read_themes` (adjust as needed).
- Webhook: `APP_UNINSTALLED`.

