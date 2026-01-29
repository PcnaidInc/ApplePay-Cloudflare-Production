-- Adds Cloudflare custom hostname SSL status tracking.
-- Safe to run once; D1 migrations are applied in order.

ALTER TABLE merchant_domains ADD COLUMN cloudflare_ssl_status TEXT;
