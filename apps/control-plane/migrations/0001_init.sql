-- D1 schema for Apple Pay Shopify App

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS shops (
  shop TEXT PRIMARY KEY,
  shop_id TEXT NOT NULL,
  shop_name TEXT NOT NULL,
  access_token TEXT NOT NULL,
  scopes TEXT NOT NULL,
  installed_at TEXT NOT NULL,
  uninstalled_at TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);

CREATE TABLE IF NOT EXISTS merchant_domains (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  shop TEXT NOT NULL,
  shop_id TEXT NOT NULL,
  domain TEXT NOT NULL UNIQUE,
  partner_internal_merchant_identifier TEXT NOT NULL,
  partner_merchant_name TEXT NOT NULL,
  encrypt_to TEXT NOT NULL,
  environment TEXT NOT NULL,
  status TEXT NOT NULL,
  cloudflare_hostname_id TEXT,
  cloudflare_hostname_status TEXT,
  last_error TEXT,
  apple_last_checked_at TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  FOREIGN KEY (shop) REFERENCES shops(shop) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_merchant_domains_shop ON merchant_domains(shop);
CREATE INDEX IF NOT EXISTS idx_merchant_domains_status ON merchant_domains(status);

CREATE TABLE IF NOT EXISTS webhook_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  shop TEXT NOT NULL,
  topic TEXT NOT NULL,
  webhook_id TEXT,
  payload TEXT NOT NULL,
  received_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
