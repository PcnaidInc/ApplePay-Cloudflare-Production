-- Oracle schema for Apple Pay Shopify App
-- Migrated from Cloudflare D1 (SQLite) to Oracle Autonomous AI Database
-- 
-- Run this via Oracle Database Actions / SQL Worksheet / SQLcl
-- Authentication: Use ORDS REST-Enabled SQL from Cloudflare Workers

-- ================================================================
-- Schema Migrations Tracking Table
-- ================================================================
CREATE TABLE schema_migrations (
  version VARCHAR2(50) NOT NULL PRIMARY KEY,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
  description VARCHAR2(500)
);

-- Record this migration
INSERT INTO schema_migrations (version, description) 
VALUES ('001', 'Initial schema - shops, merchant_domains, webhook_events');

-- ================================================================
-- SHOPS TABLE
-- Stores Shopify app installation records
-- ================================================================
CREATE TABLE shops (
  shop VARCHAR2(255) NOT NULL PRIMARY KEY,
  shop_id VARCHAR2(255) NOT NULL,
  shop_name VARCHAR2(500) NOT NULL,
  access_token VARCHAR2(500) NOT NULL,
  scopes VARCHAR2(1000) NOT NULL,
  installed_at TIMESTAMP WITH TIME ZONE NOT NULL,
  uninstalled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL
);

-- Indexes
CREATE INDEX idx_shops_shop_id ON shops(shop_id);
CREATE INDEX idx_shops_installed_at ON shops(installed_at);

-- ================================================================
-- MERCHANT_DOMAINS TABLE
-- Stores Apple Pay domain registration state
-- ================================================================
CREATE TABLE merchant_domains (
  id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  shop VARCHAR2(255) NOT NULL,
  shop_id VARCHAR2(255) NOT NULL,
  domain VARCHAR2(500) NOT NULL UNIQUE,
  
  -- Apple Pay merchant fields
  partner_internal_merchant_identifier VARCHAR2(500) NOT NULL,
  partner_merchant_name VARCHAR2(500) NOT NULL,
  encrypt_to VARCHAR2(500) NOT NULL,
  environment VARCHAR2(50) NOT NULL,
  
  -- Status tracking
  status VARCHAR2(100) NOT NULL,
  last_error CLOB,
  apple_last_checked_at TIMESTAMP WITH TIME ZONE,
  
  -- Cloudflare custom hostname fields
  cloudflare_hostname_id VARCHAR2(255),
  cloudflare_hostname_status VARCHAR2(100),
  cloudflare_ssl_status VARCHAR2(100),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL,
  
  -- Foreign key to shops
  CONSTRAINT fk_merchant_domains_shop 
    FOREIGN KEY (shop) 
    REFERENCES shops(shop) 
    ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_merchant_domains_shop ON merchant_domains(shop);
CREATE INDEX idx_merchant_domains_shop_id ON merchant_domains(shop_id);
CREATE INDEX idx_merchant_domains_status ON merchant_domains(status);
CREATE INDEX idx_merchant_domains_domain ON merchant_domains(domain);
CREATE INDEX idx_merchant_domains_updated_at ON merchant_domains(updated_at);

-- ================================================================
-- WEBHOOK_EVENTS TABLE
-- Audit log for Shopify webhooks
-- ================================================================
CREATE TABLE webhook_events (
  id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  shop VARCHAR2(255),
  topic VARCHAR2(255),
  webhook_id VARCHAR2(255),
  payload CLOB NOT NULL,
  received_at TIMESTAMP WITH TIME ZONE,
  processed_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR2(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT SYSTIMESTAMP NOT NULL
);

-- Indexes for querying
CREATE INDEX idx_webhook_events_shop ON webhook_events(shop);
CREATE INDEX idx_webhook_events_topic ON webhook_events(topic);
CREATE INDEX idx_webhook_events_created_at ON webhook_events(created_at);
CREATE INDEX idx_webhook_events_status ON webhook_events(status);

-- ================================================================
-- COMMENTS (Documentation)
-- ================================================================
COMMENT ON TABLE shops IS 'Shopify app installation records';
COMMENT ON TABLE merchant_domains IS 'Apple Pay domain registration state and Cloudflare custom hostname tracking';
COMMENT ON TABLE webhook_events IS 'Audit log for all Shopify webhooks received';
COMMENT ON TABLE schema_migrations IS 'Tracks applied database migrations';

COMMIT;
