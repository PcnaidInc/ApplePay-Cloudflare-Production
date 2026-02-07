# Oracle Database Migrations

This directory contains Oracle SQL migration scripts for the Apple Pay Shopify App.

## Prerequisites

1. **Oracle Autonomous AI Database** instance provisioned
2. Access to **ORDS (Oracle REST Data Services)** base URL
3. **Database Actions** access OR **SQLcl** installed locally
4. Schema credentials (username/password)

## Running Migrations

### Option 1: Via Database Actions (Web UI)

1. Navigate to your Oracle Autonomous Database
2. Click "Database Actions" > "SQL"
3. Open and execute each migration file in order:
   - `001_initial_schema.sql`
   - (Add new migrations as numbered files)

### Option 2: Via SQLcl (Command Line)

```bash
# Connect to your Oracle database
sql admin@pcnaid_low

# Run migrations in order
@001_initial_schema.sql
```

### Option 3: Via ORDS REST-Enabled SQL (Advanced)

For automated deployment, you can execute migrations via ORDS API:

```bash
curl -X POST "{{ORDS_BASE_URL}}/ords/{{SCHEMA}}/_/sql" \
  -u "{{ORDS_USERNAME}}:{{ORDS_PASSWORD}}" \
  -H "Content-Type: application/json" \
  -d @migration-payload.json
```

## Migration Tracking

The `schema_migrations` table tracks which migrations have been applied:

```sql
SELECT * FROM schema_migrations ORDER BY applied_at;
```

## Creating New Migrations

1. Create a new file: `00X_description.sql` (increment number)
2. Start with:
   ```sql
   -- Check if already applied
   SELECT version FROM schema_migrations WHERE version = '00X';
   
   -- Your DDL/DML here
   
   -- Record migration
   MERGE INTO schema_migrations d
   USING (SELECT '00X' as version, 'Brief description' as description FROM dual) s
   ON (d.version = s.version)
   WHEN NOT MATCHED THEN
     INSERT (version, description)
     VALUES (s.version, s.description);
   COMMIT;

## Schema Overview

### Tables

- **shops**: Shopify app installation records
- **merchant_domains**: Apple Pay domain registration state
- **webhook_events**: Audit log for Shopify webhooks
- **schema_migrations**: Tracks applied migrations

### Key Differences from D1/SQLite

1. **Types**: `VARCHAR2` instead of `TEXT`, `NUMBER` instead of `INTEGER`, `TIMESTAMP WITH TIME ZONE` instead of `TEXT`
2. **Identity Columns**: `NUMBER GENERATED ALWAYS AS IDENTITY` instead of `INTEGER PRIMARY KEY AUTOINCREMENT`
3. **CLOB**: Used for large text fields (payload, last_error)
4. **Upserts**: Use `MERGE` statement instead of `INSERT ... ON CONFLICT`
5. **Timestamps**: Use `SYSTIMESTAMP` instead of `strftime('%Y-%m-%dT%H:%M:%fZ','now')`

## Connection Details

Configure these environment variables in your Cloudflare Worker:

```bash
ORDS_BASE_URL=https://...
ORDS_SCHEMA_ALIAS=ADMIN  # or your schema name
ORDS_USERNAME=...
ORDS_PASSWORD=...
# Optional:
ORDS_AUTH_MODE=basic  # or 'oauth'
```

## Troubleshooting

**Error: Table already exists**
- Migrations are idempotent where possible (use `CREATE TABLE IF NOT EXISTS` or check existence)
- Check `schema_migrations` to see what's been applied

**Error: Insufficient privileges**
- Ensure your schema user has CREATE TABLE, CREATE INDEX, CREATE SEQUENCE privileges

**Error: Cannot connect via ORDS**
- Verify ORDS_BASE_URL is correct
- Check authentication credentials
- Ensure ORDS is enabled for your schema
