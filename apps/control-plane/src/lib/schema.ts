// Runtime D1 schema guard.
//
// Why this exists:
// - D1 migrations are great, but during rapid iteration it's easy to deploy code
//   that expects columns that a dev/staging DB doesn't have yet.
// - This helper makes the worker resilient by creating tables (if missing) and
//   adding missing columns (best-effort) once per isolate.

let _ensured: Promise<void> | null = null;

type Col = { name: string };

async function tableInfo(db: D1Database, table: string): Promise<Col[]> {
  const res = await db.prepare(`PRAGMA table_info('${table}')`).all<Col>();
  return (res.results ?? []) as Col[];
}

async function hasColumn(db: D1Database, table: string, column: string): Promise<boolean> {
  const cols = await tableInfo(db, table);
  return cols.some((c) => c.name === column);
}

async function addColumnIfMissing(db: D1Database, table: string, ddl: string, columnName: string): Promise<void> {
  if (await hasColumn(db, table, columnName)) return;
  await db.exec(ddl);
}

export function ensureSchema(db: D1Database): Promise<void> {
  if (_ensured) return _ensured;
  _ensured = (async () => {
    // Create tables with the latest schema (no-ops if they already exist).
    await db.exec(`
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
        cloudflare_ssl_status TEXT,
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
        shop TEXT,
        topic TEXT,
        webhook_id TEXT,
        payload TEXT NOT NULL,
        received_at TEXT,
        processed_at TEXT,
        status TEXT,
        created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
      );
    `);

    // Best-effort column backfills for older DBs.
    await addColumnIfMissing(
      db,
      'merchant_domains',
      `ALTER TABLE merchant_domains ADD COLUMN cloudflare_ssl_status TEXT;`,
      'cloudflare_ssl_status'
    );

    await addColumnIfMissing(
      db,
      'webhook_events',
      `ALTER TABLE webhook_events ADD COLUMN processed_at TEXT;`,
      'processed_at'
    );
    await addColumnIfMissing(
      db,
      'webhook_events',
      `ALTER TABLE webhook_events ADD COLUMN status TEXT;`,
      'status'
    );
    await addColumnIfMissing(
      db,
      'webhook_events',
      `ALTER TABLE webhook_events ADD COLUMN created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'));`,
      'created_at'
    );

    await addColumnIfMissing(
      db,
      'shops',
      `ALTER TABLE shops ADD COLUMN created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'));`,
      'created_at'
    );
    await addColumnIfMissing(
      db,
      'shops',
      `ALTER TABLE shops ADD COLUMN updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'));`,
      'updated_at'
    );

    await addColumnIfMissing(
      db,
      'merchant_domains',
      `ALTER TABLE merchant_domains ADD COLUMN created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'));`,
      'created_at'
    );
    await addColumnIfMissing(
      db,
      'merchant_domains',
      `ALTER TABLE merchant_domains ADD COLUMN updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'));`,
      'updated_at'
    );
  })().catch((err) => {
    // Allow retry if schema bootstrap fails for any reason.
    _ensured = null;
    throw err;
  });

  return _ensured;
}
