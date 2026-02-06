# Oracle Database Migration Guide

## Overview

This guide documents the migration from Cloudflare D1 (SQLite) to Oracle Autonomous AI Database for the Apple Pay Shopify App.

## Why Migrate?

**D1 Issues Encountered:**
- Production 500 errors related to D1 reliability
- "reading 'duration'" errors and confusing tracing crashes
- "prepare of undefined" errors
- Inconsistent performance

**Oracle Benefits:**
- Enterprise-grade reliability and ACID compliance
- 30 concurrent sessions with auto-scaling
- Free tier (2 ECPUs, 20GB) suitable for production
- Full Oracle SQL/PLSQL capabilities
- ORDS provides RESTful SQL access from Cloudflare Workers

## Architecture

### Before (D1)
```
Cloudflare Worker → D1Database binding → SQLite
```

### After (Oracle)
```
Cloudflare Worker → HTTPS/fetch → ORDS → Oracle Autonomous AI DB
```

## Implementation Details

### 1. ORDS Client (`src/lib/ordsClient.ts`)

A lightweight client that wraps `fetch()` for executing SQL via ORDS:

- **queryOne(sql, binds)**: Execute SELECT and return single row or null
- **queryMany(sql, binds)**: Execute SELECT and return array of rows
- **execute(sql, binds)**: Execute DML (INSERT, UPDATE, DELETE, MERGE)

Key features:
- ✅ Bind parameter support (SQL injection safe)
- ✅ Automatic column name normalization (Oracle uppercase → snake_case)
- ✅ Timeout handling (30s default)
- ✅ Error handling with correlation IDs
- ✅ Basic auth support

### 2. Oracle Persistence Layer (`src/lib/oracleDb.ts`)

Direct port of D1 `db.ts` functions with identical signatures:

| Function | Purpose | Implementation |
|----------|---------|----------------|
| `upsertShop` | Create/update shop record | Oracle MERGE |
| `getShopByShop` | Fetch shop by domain | SELECT with binds |
| `markShopUninstalled` | Mark shop uninstalled | UPDATE |
| `upsertMerchantDomain` | Create/update domain | Oracle MERGE |
| `getMerchantDomainByShop` | Fetch domain by shop | SELECT FIRST 1 ROW |
| `getMerchantDomainByDomain` | Fetch domain | SELECT with binds |
| `updateMerchantDomainAppleStatus` | Update Apple status | UPDATE |
| `updateMerchantDomainCloudflareStatus` | Update CF status | UPDATE |
| `listMerchantDomainsByShop` | List all domains | SELECT |
| `logWebhookEvent` | Log webhook | INSERT |

### 3. Schema Mapping

| SQLite/D1 | Oracle | Notes |
|-----------|--------|-------|
| `TEXT` | `VARCHAR2(n)` | Sized appropriately |
| `TEXT` (large) | `CLOB` | For payload, last_error |
| `INTEGER` | `NUMBER` | For numeric values |
| `INTEGER PRIMARY KEY AUTOINCREMENT` | `NUMBER GENERATED ALWAYS AS IDENTITY` | Auto-increment |
| `strftime('%Y-%m-%dT%H:%M:%fZ','now')` | `SYSTIMESTAMP` | Timestamp with timezone |
| `INSERT ... ON CONFLICT DO UPDATE` | `MERGE INTO ... USING ... WHEN MATCHED` | Upsert pattern |

### 4. Timestamp Handling

All timestamps are stored as `TIMESTAMP WITH TIME ZONE` and converted to/from ISO 8601 strings:

```sql
-- Insert/Update
TO_TIMESTAMP_TZ(:iso_string, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"')

-- Select
TO_CHAR(timestamp_column, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"') AS "column_name"
```

### 5. Column Name Normalization

Oracle returns columns in uppercase by default. We handle this in two ways:

1. **In SELECT statements**: Use quoted identifiers
   ```sql
   SELECT shop AS "shop", shop_id AS "shop_id" FROM shops
   ```

2. **In ordsClient**: Lowercase all column names in responses
   ```typescript
   normalizeColumnNames(row: Record<string, any>)
   ```

## Migration Steps

### Step 1: Provision Oracle Database

1. Go to [Oracle Cloud](https://cloud.oracle.com/)
2. Create Oracle Autonomous Database (free tier: 2 ECPUs, 20GB)
3. Note the ORDS base URL from Database Actions

### Step 2: Run Migrations

```bash
# Option A: Via Database Actions (Web UI)
# 1. Click "Database Actions" > "SQL"
# 2. Open and execute: apps/control-plane/oracle-migrations/001_initial_schema.sql

# Option B: Via SQLcl (Command Line)
sql admin@dbname_low
@apps/control-plane/oracle-migrations/001_initial_schema.sql
```

### Step 3: Configure Secrets

```bash
# Set ORDS credentials as secrets
wrangler secret put ORDS_USERNAME
wrangler secret put ORDS_PASSWORD

# Also set other required secrets
wrangler secret put SHOPIFY_API_SECRET
wrangler secret put CF_API_TOKEN
wrangler secret put APPLE_JWT_CERT_PEM
wrangler secret put APPLE_JWT_PRIVATE_KEY_PEM
```

### Step 4: Update wrangler.jsonc

```jsonc
{
  "vars": {
    // ... other vars ...
    "ORDS_BASE_URL": "https://your-instance.oraclecloudapps.com",
    "ORDS_SCHEMA_ALIAS": "ADMIN",
    "ORDS_AUTH_MODE": "basic"
  }
}
```

### Step 5: Deploy

```bash
npm install
npm -w apps/admin-ui run build
npm -w apps/control-plane run deploy
```

## Data Migration (Optional)

If you have existing D1 data, export and import it:

### Export from D1

```bash
# Export shops
wrangler d1 execute DB --command="SELECT * FROM shops" --json > shops.json

# Export merchant_domains
wrangler d1 execute DB --command="SELECT * FROM merchant_domains" --json > domains.json
```

### Import to Oracle

Write a migration script to:
1. Read JSON exports
2. Transform data types (timestamps, etc.)
3. Execute INSERT via ORDS

Example:
```typescript
import { createOrdsClient } from './src/lib/ordsClient';

const client = createOrdsClient({
  baseUrl: process.env.ORDS_BASE_URL!,
  schemaAlias: process.env.ORDS_SCHEMA_ALIAS!,
  username: process.env.ORDS_USERNAME!,
  password: process.env.ORDS_PASSWORD!,
});

const shops = JSON.parse(fs.readFileSync('shops.json', 'utf-8'));
for (const shop of shops) {
  await client.execute(`
    INSERT INTO shops (shop, shop_id, shop_name, access_token, scopes, installed_at, created_at, updated_at)
    VALUES (:shop, :shop_id, :shop_name, :access_token, :scopes, 
            TO_TIMESTAMP_TZ(:installed_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"'),
            SYSTIMESTAMP, SYSTIMESTAMP)
  `, shop);
}
```

## Testing

After deployment, verify all functionality:

1. **OAuth Flow**: Install the app in a test shop
2. **API Endpoints**:
   - `GET /api/shop` - Shop info
   - `GET /api/applepay/status` - Domain status
   - `POST /api/applepay/onboard` - Domain onboarding
3. **Webhooks**: Trigger app/uninstalled webhook
4. **Error Handling**: Test with invalid data

## Troubleshooting

### "Failed to initialize Oracle database client"

**Cause**: Missing or invalid ORDS configuration

**Solution**: 
```bash
# Verify secrets are set
wrangler secret list

# Verify wrangler.jsonc has correct ORDS_BASE_URL and ORDS_SCHEMA_ALIAS
```

### ORDS 401 Unauthorized

**Cause**: Invalid ORDS username/password

**Solution**:
```bash
# Re-set credentials
wrangler secret put ORDS_USERNAME
wrangler secret put ORDS_PASSWORD
```

### ORDS 404 Not Found

**Cause**: Incorrect schema alias or ORDS not enabled

**Solution**:
- Verify ORDS_SCHEMA_ALIAS matches your actual schema name
- Ensure ORDS is enabled in Database Actions

### Column names not matching (undefined values)

**Cause**: Oracle returns uppercase columns, expecting lowercase

**Solution**: Verify quoted identifiers in SQL:
```sql
-- Correct
SELECT shop AS "shop" FROM shops

-- Incorrect
SELECT shop FROM shops  -- Returns SHOP (uppercase)
```

### Timeout errors

**Cause**: Query taking longer than 30 seconds

**Solution**: Increase timeout in ordsClient constructor:
```typescript
const client = new OrdsClient(config, 60000); // 60 seconds
```

## Performance Considerations

### Connection Pooling

ORDS handles connection pooling internally. Each fetch request is independent:

```typescript
// ✅ Good: One fetch per request
const client = getOracleClient(c);
const shop = await getShopByShop(client, shopDomain);

// ❌ Don't worry about: Connection pooling (ORDS handles it)
```

### Query Optimization

- **Use indexes**: All frequently-queried columns are indexed
- **Limit results**: Use `FETCH FIRST N ROWS ONLY` for pagination
- **Binds**: Always use bind parameters (already implemented)

### Session Limits

Free tier: 30 concurrent sessions

- Average request: < 1 second
- Typical throughput: > 100 requests/second
- Sufficient for most Shopify apps

## Rollback Plan

If issues arise, you can temporarily rollback to D1:

1. Revert `wrangler.jsonc` changes (restore d1_databases binding)
2. Restore `src/lib/db.ts` from `db.ts.d1-deprecated`
3. Restore `src/lib/schema.ts` from `schema.ts.d1-deprecated`
4. Update `src/index.ts` imports
5. Redeploy

Note: This is NOT recommended as D1 reliability issues will return.

## Monitoring

Add these logs to track Oracle health:

```typescript
// In getOracleClient()
logEvent(c, 'info', 'oracle.client.created', {
  baseUrl: c.env.ORDS_BASE_URL,
  schema: c.env.ORDS_SCHEMA_ALIAS,
});

// In ordsClient error handler
logEvent(c, 'error', 'oracle.query.failed', {
  sql: statementText,
  error: err.message,
  correlationId: err.correlationId,
});
```

## References

- [Oracle Autonomous Database](https://www.oracle.com/autonomous-database/)
- [ORDS REST-Enabled SQL](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/)
- [Oracle SQL Reference](https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)

## Support

For issues related to this migration:
1. Check logs for correlation IDs
2. Verify ORDS configuration
3. Test queries in Database Actions SQL Worksheet
4. Review `apps/control-plane/oracle-migrations/README.md`
