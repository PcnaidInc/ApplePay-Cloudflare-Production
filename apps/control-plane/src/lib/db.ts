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
  cloudflare_hostname_id: string | null;
  cloudflare_hostname_status: string | null;
  last_error: string | null;
  apple_last_checked_at: string | null;
};

export async function upsertShop(db: D1Database, args: {
  shop: string;
  shopId: string;
  shopName: string;
  accessToken: string;
  scopes: string;
}): Promise<void> {
  const now = new Date().toISOString();
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
    .bind(args.shop, args.shopId, args.shopName, args.accessToken, args.scopes, now, now, now)
    .run();
}

export async function markShopUninstalled(db: D1Database, shop: string): Promise<void> {
  const now = new Date().toISOString();
  await db
    .prepare(`UPDATE shops SET uninstalled_at=?, updated_at=? WHERE shop=?`)
    .bind(now, now, shop)
    .run();
}

export async function getShop(db: D1Database, shop: string): Promise<ShopRow | null> {
  const res = await db.prepare(`SELECT * FROM shops WHERE shop=?`).bind(shop).first<ShopRow>();
  return res ?? null;
}

export async function upsertMerchantDomain(db: D1Database, args: {
  shop: string;
  shopId: string;
  domain: string;
  partnerInternalMerchantIdentifier: string;
  partnerMerchantName: string;
  encryptTo: string;
  environment: string;
  status: string;
  cloudflareHostnameId?: string | null;
  cloudflareHostnameStatus?: string | null;
  lastError?: string | null;
}): Promise<void> {
  const now = new Date().toISOString();
  await db
    .prepare(
      `INSERT INTO merchant_domains (
          shop, shop_id, domain, partner_internal_merchant_identifier, partner_merchant_name,
          encrypt_to, environment, status, cloudflare_hostname_id, cloudflare_hostname_status,
          last_error, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(domain) DO UPDATE SET
          shop=excluded.shop,
          shop_id=excluded.shop_id,
          partner_internal_merchant_identifier=excluded.partner_internal_merchant_identifier,
          partner_merchant_name=excluded.partner_merchant_name,
          encrypt_to=excluded.encrypt_to,
          environment=excluded.environment,
          status=excluded.status,
          cloudflare_hostname_id=excluded.cloudflare_hostname_id,
          cloudflare_hostname_status=excluded.cloudflare_hostname_status,
          last_error=excluded.last_error,
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
      args.cloudflareHostnameId ?? null,
      args.cloudflareHostnameStatus ?? null,
      args.lastError ?? null,
      now,
      now
    )
    .run();
}

export async function updateMerchantDomainStatus(db: D1Database, domain: string, args: { status: string; lastError?: string | null; appleLastCheckedAt?: string | null; cloudflareHostnameStatus?: string | null }): Promise<void> {
  const now = new Date().toISOString();
  await db
    .prepare(
      `UPDATE merchant_domains SET status=?, last_error=?, apple_last_checked_at=?, cloudflare_hostname_status=?, updated_at=? WHERE domain=?`
    )
    .bind(args.status, args.lastError ?? null, args.appleLastCheckedAt ?? null, args.cloudflareHostnameStatus ?? null, now, domain)
    .run();
}

export async function getMerchantDomainByShop(db: D1Database, shop: string): Promise<MerchantDomainRow | null> {
  const row = await db
    .prepare(`SELECT * FROM merchant_domains WHERE shop=? ORDER BY updated_at DESC LIMIT 1`)
    .bind(shop)
    .first<MerchantDomainRow>();
  return row ?? null;
}

export async function getMerchantDomainByDomain(db: D1Database, domain: string): Promise<MerchantDomainRow | null> {
  const row = await db.prepare(`SELECT * FROM merchant_domains WHERE domain=?`).bind(domain).first<MerchantDomainRow>();
  return row ?? null;
}

export async function logWebhookEvent(db: D1Database, args: { shop: string; topic: string; webhookId?: string | null; payload: string }): Promise<void> {
  await db
    .prepare(`INSERT INTO webhook_events (shop, topic, webhook_id, payload) VALUES (?, ?, ?, ?)`)
    .bind(args.shop, args.topic, args.webhookId ?? null, args.payload)
    .run();
}
