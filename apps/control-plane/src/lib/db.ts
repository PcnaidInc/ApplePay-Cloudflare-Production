// Cloudflare D1 data access helpers.

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

  created_at: string | null;
  updated_at: string | null;
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

function nowIso(): string {
  return new Date().toISOString();
}

// -------------------- Shops --------------------

export async function upsertShop(
  db: D1Database,
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

  await db
    .prepare(
      `INSERT INTO shops (shop, shop_id, shop_name, access_token, scopes, installed_at, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(shop) DO UPDATE SET
         shop_id=excluded.shop_id,
         shop_name=excluded.shop_name,
         access_token=excluded.access_token,
         scopes=excluded.scopes,
         installed_at=excluded.installed_at,
         uninstalled_at=NULL,
         updated_at=excluded.updated_at`
    )
    .bind(args.shop, args.shopId, args.shopName, args.accessToken, args.scopes, installedAt, now, now)
    .run();
}

export async function getShopByShop(db: D1Database, shop: string): Promise<ShopRow | null> {
  const row = await db.prepare(`SELECT * FROM shops WHERE shop=?`).bind(shop).first<ShopRow>();
  return row ?? null;
}

export async function markShopUninstalled(db: D1Database, shop: string, uninstalledAt?: string): Promise<void> {
  const now = nowIso();
  await db
    .prepare(`UPDATE shops SET uninstalled_at=?, updated_at=? WHERE shop=?`)
    .bind(uninstalledAt ?? now, now, shop)
    .run();
}

// -------------------- Merchant domains --------------------

export async function upsertMerchantDomain(
  db: D1Database,
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

  await db
    .prepare(
      `INSERT INTO merchant_domains (
          shop,
          shop_id,
          domain,
          partner_internal_merchant_identifier,
          partner_merchant_name,
          encrypt_to,
          environment,
          status,
          last_error,
          apple_last_checked_at,
          cloudflare_hostname_id,
          cloudflare_hostname_status,
          cloudflare_ssl_status,
          created_at,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(domain) DO UPDATE SET
          shop=excluded.shop,
          shop_id=excluded.shop_id,
          partner_internal_merchant_identifier=excluded.partner_internal_merchant_identifier,
          partner_merchant_name=excluded.partner_merchant_name,
          encrypt_to=excluded.encrypt_to,
          environment=excluded.environment,
          status=excluded.status,
          last_error=excluded.last_error,
          apple_last_checked_at=excluded.apple_last_checked_at,
          cloudflare_hostname_id=excluded.cloudflare_hostname_id,
          cloudflare_hostname_status=excluded.cloudflare_hostname_status,
          cloudflare_ssl_status=excluded.cloudflare_ssl_status,
          updated_at=excluded.updated_at`
    )
    .bind(
      args.shop,
      args.shopId,
      args.domain,
      args.partnerInternalMerchantIdentifier,
      args.partnerMerchantName,
      args.encryptTo,
      args.environment,
      args.status,
      args.lastError ?? null,
      args.appleLastCheckedAt ?? null,
      args.cloudflareHostnameId ?? null,
      args.cloudflareHostnameStatus ?? null,
      args.cloudflareSslStatus ?? null,
      now,
      now
    )
    .run();
}

export async function getMerchantDomainByShop(db: D1Database, shop: string): Promise<MerchantDomainRow | null> {
  const row = await db
    .prepare(`SELECT * FROM merchant_domains WHERE shop=? ORDER BY updated_at DESC LIMIT 1`)
    .bind(shop)
    .first<MerchantDomainRow>();
  return row ?? null;
}

export async function getMerchantDomainsByShop(db: D1Database, shop: string): Promise<MerchantDomainRow[]> {
  const result = await db
    .prepare(`SELECT * FROM merchant_domains WHERE shop=? ORDER BY updated_at DESC`)
    .bind(shop)
    .all<MerchantDomainRow>();
  return result.results ?? [];
}

export async function getMerchantDomainByDomain(db: D1Database, domain: string): Promise<MerchantDomainRow | null> {
  const row = await db.prepare(`SELECT * FROM merchant_domains WHERE domain=?`).bind(domain).first<MerchantDomainRow>();
  return row ?? null;
}

export async function updateMerchantDomainAppleStatus(
  db: D1Database,
  args: {
    domain: string;
    status: string;
    lastError?: string | null;
    appleLastCheckedAt?: string | null;
  }
): Promise<void> {
  const now = nowIso();
  await db
    .prepare(
      `UPDATE merchant_domains
       SET status=?, last_error=?, apple_last_checked_at=?, updated_at=?
       WHERE domain=?`
    )
    .bind(args.status, args.lastError ?? null, args.appleLastCheckedAt ?? null, now, args.domain)
    .run();
}

export async function updateMerchantDomainCloudflareStatus(
  db: D1Database,
  args: {
    domain: string;
    cloudflareHostnameId?: string | null;
    cloudflareHostnameStatus?: string | null;
    cloudflareSslStatus?: string | null;
    lastError?: string | null;
  }
): Promise<void> {
  const now = nowIso();
  await db
    .prepare(
      `UPDATE merchant_domains
       SET cloudflare_hostname_id=?, cloudflare_hostname_status=?, cloudflare_ssl_status=?, last_error=?, updated_at=?
       WHERE domain=?`
    )
    .bind(
      args.cloudflareHostnameId ?? null,
      args.cloudflareHostnameStatus ?? null,
      args.cloudflareSslStatus ?? null,
      args.lastError ?? null,
      now,
      args.domain
    )
    .run();
}

// -------------------- Webhook events --------------------

export async function logWebhookEvent(
  db: D1Database,
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
  await db
    .prepare(
      `INSERT INTO webhook_events (shop, topic, webhook_id, payload, received_at, processed_at, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      args.shop ?? null,
      args.topic ?? null,
      args.webhookId ?? null,
      args.payload,
      args.receivedAt ?? now,
      args.processedAt ?? now,
      args.status ?? 'ok',
      now
    )
    .run();
}
