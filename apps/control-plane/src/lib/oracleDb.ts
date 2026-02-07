// Oracle database access helpers via ORDS
// Replaces D1 data access from db.ts

import { OrdsClient } from './ordsClient';
import { nowIso } from './timestamp';

// Keep the same type definitions for compatibility
export type ShopRow = {
  shop: string;
  shop_id: string;
  shop_name: string;
  access_token: string;
  scopes: string;
  installed_at: string;
  uninstalled_at: string | null;
};

export type MerchantDomainRow = {
  id: number;
  shop: string;
  shop_id: string;
  domain: string;

  partner_internal_merchant_identifier: string;
  partner_merchant_name: string;
  encrypt_to: string;
  environment: string;

  status: string;
  last_error: string | null;
  apple_last_checked_at: string | null;

  cloudflare_hostname_id: string | null;
  cloudflare_hostname_status: string | null;
  cloudflare_ssl_status: string | null;

  created_at: string;
  updated_at: string;
};

export type WebhookEventRow = {
  id: number;
  shop: string | null;
  topic: string | null;
  webhook_id: string | null;
  payload: string;
  received_at: string | null;
  processed_at: string | null;
  status: string | null;
};

// -------------------- Shops --------------------

/**
 * Upsert a shop record
 * Uses Oracle MERGE statement
 */
export async function upsertShop(
  client: OrdsClient,
  args: {
    shop: string;
    shopId: string;
    shopName: string;
    accessToken: string;
    scopes: string;
    installedAt?: string;
  }
): Promise<void> {
  const now = nowIso();
  const installedAt = args.installedAt ?? now;

  const sql = `
    MERGE INTO shops t
    USING (
      SELECT 
        :shop AS shop,
        :shop_id AS shop_id,
        :shop_name AS shop_name,
        :access_token AS access_token,
        :scopes AS scopes,
        TO_TIMESTAMP_TZ(:installed_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"') AS installed_at,
        TO_TIMESTAMP_TZ(:created_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"') AS created_at,
        TO_TIMESTAMP_TZ(:updated_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"') AS updated_at
      FROM dual
    ) s
    ON (t.shop = s.shop)
    WHEN MATCHED THEN
      UPDATE SET
        t.shop_id = s.shop_id,
        t.shop_name = s.shop_name,
        t.access_token = s.access_token,
        t.scopes = s.scopes,
        t.installed_at = s.installed_at,
        t.uninstalled_at = NULL,
        t.updated_at = s.updated_at
    WHEN NOT MATCHED THEN
      INSERT (shop, shop_id, shop_name, access_token, scopes, installed_at, created_at, updated_at)
      VALUES (s.shop, s.shop_id, s.shop_name, s.access_token, s.scopes, s.installed_at, s.created_at, s.updated_at)
  `;

  await client.execute(sql, {
    shop: args.shop,
    shop_id: args.shopId,
    shop_name: args.shopName,
    access_token: args.accessToken,
    scopes: args.scopes,
    installed_at: installedAt,
    created_at: now,
    updated_at: now,
  });
}

/**
 * Get shop by shop domain
 */
export async function getShopByShop(client: OrdsClient, shop: string): Promise<ShopRow | null> {
  const sql = `
    SELECT 
      shop AS "shop",
      shop_id AS "shop_id",
      shop_name AS "shop_name",
      access_token AS "access_token",
      scopes AS "scopes",
      TO_CHAR(installed_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"') AS "installed_at",
      TO_CHAR(uninstalled_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"') AS "uninstalled_at"
    FROM shops 
    WHERE shop = :shop
  `;

  return await client.queryOne<ShopRow>(sql, { shop });
}

/**
 * Mark a shop as uninstalled
 */
export async function markShopUninstalled(
  client: OrdsClient,
  shop: string,
  uninstalledAt?: string
): Promise<void> {
  const now = nowIso();
  const uninstallTime = uninstalledAt ?? now;

  const sql = `
    UPDATE shops 
    SET 
      uninstalled_at = TO_TIMESTAMP_TZ(:uninstalled_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'),
      updated_at = TO_TIMESTAMP_TZ(:updated_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"')
    WHERE shop = :shop
  `;

  await client.execute(sql, {
    uninstalled_at: uninstallTime,
    updated_at: now,
    shop,
  });
}

// -------------------- Merchant domains --------------------

/**
 * Upsert a merchant domain record
 * Uses Oracle MERGE statement
 */
export async function upsertMerchantDomain(
  client: OrdsClient,
  args: {
    shop: string;
    shopId: string;
    domain: string;
    partnerInternalMerchantIdentifier: string;
    partnerMerchantName: string;
    encryptTo: string;
    environment: string;
    status: string;
    lastError?: string | null;
    cloudflareHostnameId?: string | null;
    cloudflareHostnameStatus?: string | null;
    cloudflareSslStatus?: string | null;
    appleLastCheckedAt?: string | null;
  }
): Promise<void> {
  const now = nowIso();

  const sql = `
    MERGE INTO merchant_domains t
    USING (
      SELECT 
        :shop AS shop,
        :shop_id AS shop_id,
        :domain AS domain,
        :partner_internal_merchant_identifier AS partner_internal_merchant_identifier,
        :partner_merchant_name AS partner_merchant_name,
        :encrypt_to AS encrypt_to,
        :environment AS environment,
        :status AS status,
        :last_error AS last_error,
        :apple_last_checked_at AS apple_last_checked_at,
        :cloudflare_hostname_id AS cloudflare_hostname_id,
        :cloudflare_hostname_status AS cloudflare_hostname_status,
        :cloudflare_ssl_status AS cloudflare_ssl_status,
        TO_TIMESTAMP_TZ(:created_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"') AS created_at,
        TO_TIMESTAMP_TZ(:updated_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"') AS updated_at
      FROM dual
    ) s
    ON (t.domain = s.domain)
    WHEN MATCHED THEN
      UPDATE SET
        t.shop = s.shop,
        t.shop_id = s.shop_id,
        t.partner_internal_merchant_identifier = s.partner_internal_merchant_identifier,
        t.partner_merchant_name = s.partner_merchant_name,
        t.encrypt_to = s.encrypt_to,
        t.environment = s.environment,
        t.status = s.status,
        t.last_error = s.last_error,
        t.apple_last_checked_at = s.apple_last_checked_at,
        t.cloudflare_hostname_id = s.cloudflare_hostname_id,
        t.cloudflare_hostname_status = s.cloudflare_hostname_status,
        t.cloudflare_ssl_status = s.cloudflare_ssl_status,
        t.updated_at = s.updated_at
    WHEN NOT MATCHED THEN
      INSERT (
        shop, shop_id, domain,
        partner_internal_merchant_identifier, partner_merchant_name,
        encrypt_to, environment, status,
        last_error, apple_last_checked_at,
        cloudflare_hostname_id, cloudflare_hostname_status, cloudflare_ssl_status,
        created_at, updated_at
      )
      VALUES (
        s.shop, s.shop_id, s.domain,
        s.partner_internal_merchant_identifier, s.partner_merchant_name,
        s.encrypt_to, s.environment, s.status,
        s.last_error, s.apple_last_checked_at,
        s.cloudflare_hostname_id, s.cloudflare_hostname_status, s.cloudflare_ssl_status,
        s.created_at, s.updated_at
      )
  `;

  await client.execute(sql, {
    shop: args.shop,
    shop_id: args.shopId,
    domain: args.domain,
    partner_internal_merchant_identifier: args.partnerInternalMerchantIdentifier,
    partner_merchant_name: args.partnerMerchantName,
    encrypt_to: args.encryptTo,
    environment: args.environment,
    status: args.status,
    last_error: args.lastError ?? null,
    apple_last_checked_at: args.appleLastCheckedAt ?? null,
    cloudflare_hostname_id: args.cloudflareHostnameId ?? null,
    cloudflare_hostname_status: args.cloudflareHostnameStatus ?? null,
    cloudflare_ssl_status: args.cloudflareSslStatus ?? null,
    created_at: now,
    updated_at: now,
  });
}

/**
 * Get merchant domain by shop (most recent)
 */
export async function getMerchantDomainByShop(
  client: OrdsClient,
  shop: string
): Promise<MerchantDomainRow | null> {
  const sql = `
    SELECT 
      id AS "id",
      shop AS "shop",
      shop_id AS "shop_id",
      domain AS "domain",
      partner_internal_merchant_identifier AS "partner_internal_merchant_identifier",
      partner_merchant_name AS "partner_merchant_name",
      encrypt_to AS "encrypt_to",
      environment AS "environment",
      status AS "status",
      last_error AS "last_error",
      TO_CHAR(apple_last_checked_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"') AS "apple_last_checked_at",
      cloudflare_hostname_id AS "cloudflare_hostname_id",
      cloudflare_hostname_status AS "cloudflare_hostname_status",
      cloudflare_ssl_status AS "cloudflare_ssl_status",
      TO_CHAR(created_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"') AS "created_at",
      TO_CHAR(updated_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"') AS "updated_at"
    FROM merchant_domains 
    WHERE shop = :shop 
    ORDER BY updated_at DESC 
    FETCH FIRST 1 ROWS ONLY
  `;

  return await client.queryOne<MerchantDomainRow>(sql, { shop });
}

/**
 * Get merchant domain by domain
 */
export async function getMerchantDomainByDomain(
  client: OrdsClient,
  domain: string
): Promise<MerchantDomainRow | null> {
  const sql = `
    SELECT 
      id AS "id",
      shop AS "shop",
      shop_id AS "shop_id",
      domain AS "domain",
      partner_internal_merchant_identifier AS "partner_internal_merchant_identifier",
      partner_merchant_name AS "partner_merchant_name",
      encrypt_to AS "encrypt_to",
      environment AS "environment",
      status AS "status",
      last_error AS "last_error",
      TO_CHAR(apple_last_checked_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"') AS "apple_last_checked_at",
      cloudflare_hostname_id AS "cloudflare_hostname_id",
      cloudflare_hostname_status AS "cloudflare_hostname_status",
      cloudflare_ssl_status AS "cloudflare_ssl_status",
      TO_CHAR(created_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"') AS "created_at",
      TO_CHAR(updated_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"') AS "updated_at"
    FROM merchant_domains 
    WHERE domain = :domain
  `;

  return await client.queryOne<MerchantDomainRow>(sql, { domain });
}

/**
 * Update merchant domain Apple Pay status
 */
export async function updateMerchantDomainAppleStatus(
  client: OrdsClient,
  args: {
    domain: string;
    status: string;
    lastError?: string | null;
    appleLastCheckedAt?: string | null;
  }
): Promise<void> {
  const now = nowIso();

  const sql = `
    UPDATE merchant_domains
    SET 
      status = :status,
      last_error = :last_error,
      apple_last_checked_at = TO_TIMESTAMP_TZ(:apple_last_checked_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'),
      updated_at = TO_TIMESTAMP_TZ(:updated_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"')
    WHERE domain = :domain
  `;

  await client.execute(sql, {
    status: args.status,
    last_error: args.lastError ?? null,
    apple_last_checked_at: args.appleLastCheckedAt ?? null,
    updated_at: now,
    domain: args.domain,
  });
}

/**
 * Update merchant domain Cloudflare status
 */
export async function updateMerchantDomainCloudflareStatus(
  client: OrdsClient,
  args: {
    domain: string;
    cloudflareHostnameId?: string | null;
    cloudflareHostnameStatus?: string | null;
    cloudflareSslStatus?: string | null;
    lastError?: string | null;
  }
): Promise<void> {
  const now = nowIso();

  const sql = `
    UPDATE merchant_domains
    SET 
      cloudflare_hostname_id = :cloudflare_hostname_id,
      cloudflare_hostname_status = :cloudflare_hostname_status,
      cloudflare_ssl_status = :cloudflare_ssl_status,
      last_error = :last_error,
      updated_at = TO_TIMESTAMP_TZ(:updated_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"')
    WHERE domain = :domain
  `;

  await client.execute(sql, {
    cloudflare_hostname_id: args.cloudflareHostnameId ?? null,
    cloudflare_hostname_status: args.cloudflareHostnameStatus ?? null,
    cloudflare_ssl_status: args.cloudflareSslStatus ?? null,
    last_error: args.lastError ?? null,
    updated_at: now,
    domain: args.domain,
  });
}

/**
 * List all merchant domains for a shop
 */
export async function listMerchantDomainsByShop(
  client: OrdsClient,
  shop: string
): Promise<MerchantDomainRow[]> {
  const sql = `
    SELECT 
      id AS "id",
      shop AS "shop",
      shop_id AS "shop_id",
      domain AS "domain",
      partner_internal_merchant_identifier AS "partner_internal_merchant_identifier",
      partner_merchant_name AS "partner_merchant_name",
      encrypt_to AS "encrypt_to",
      environment AS "environment",
      status AS "status",
      last_error AS "last_error",
      TO_CHAR(apple_last_checked_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"') AS "apple_last_checked_at",
      cloudflare_hostname_id AS "cloudflare_hostname_id",
      cloudflare_hostname_status AS "cloudflare_hostname_status",
      cloudflare_ssl_status AS "cloudflare_ssl_status",
      TO_CHAR(created_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"') AS "created_at",
      TO_CHAR(updated_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"') AS "updated_at"
    FROM merchant_domains 
    WHERE shop = :shop 
    ORDER BY updated_at DESC
  `;

  return await client.queryMany<MerchantDomainRow>(sql, { shop });
}

// -------------------- Webhook events --------------------

/**
 * Log a webhook event
 */
export async function logWebhookEvent(
  client: OrdsClient,
  args: {
    shop?: string | null;
    topic?: string | null;
    webhookId?: string | null;
    payload: string;
    receivedAt?: string | null;
    processedAt?: string | null;
    status?: string | null;
  }
): Promise<void> {
  const now = nowIso();

  const sql = `
    INSERT INTO webhook_events (
      shop, topic, webhook_id, payload, 
      received_at, processed_at, status, created_at
    ) VALUES (
      :shop, :topic, :webhook_id, :payload,
      TO_TIMESTAMP_TZ(:received_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'),
      TO_TIMESTAMP_TZ(:processed_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'),
      :status,
      TO_TIMESTAMP_TZ(:created_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"')
    )
  `;

  await client.execute(sql, {
    shop: args.shop ?? null,
    topic: args.topic ?? null,
    webhook_id: args.webhookId ?? null,
    payload: args.payload,
    received_at: args.receivedAt ?? now,
    processed_at: args.processedAt ?? now,
    status: args.status ?? 'ok',
    created_at: now,
  });
}
