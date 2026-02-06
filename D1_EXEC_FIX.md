# D1 exec() meta.duration Error Fix

## Problem Summary

Multiple Control Plane API endpoints were failing with HTTP 500 errors:
- `GET /api/shop`
- `GET /api/applepay/domains`
- `POST /api/applepay/onboard`

Error message: `TypeError: Cannot read properties of undefined (reading "duration")`

## Root Cause Analysis

The error originated from Cloudflare's internal D1 API code (`cloudflare-internal:d1-api`). Specifically, when the `db.exec()` method processes multiple SQL statements, it aggregates timing metadata from each statement's execution result.

### The Problem in D1 Internal Code

```typescript
// From workerd/src/cloudflare/internal/d1-api.ts (line ~439-445)
return {
  count: exec.length,
  duration: exec.reduce((p, c) => {
    return p + c.meta['duration'];  // <-- Error occurs here
  }, 0),
};
```

When `exec()` is called with a multi-line SQL string:
1. D1 splits it by newlines
2. Executes each statement separately
3. Attempts to aggregate the `duration` from each result's `meta` object
4. If any result has a missing or malformed `meta` object, accessing `c.meta['duration']` throws an error

### Why PRAGMA Statements Cause Issues

In our `ensureSchema()` function, we were mixing PRAGMA statements with CREATE statements:

```typescript
await db.exec(`
  PRAGMA foreign_keys = ON;   // <-- Different result structure

  CREATE TABLE IF NOT EXISTS shops (...);
  CREATE TABLE IF NOT EXISTS merchant_domains (...);
  ...
`);
```

PRAGMA statements in SQLite return results with a different structure than DDL statements (CREATE, ALTER, etc.). When D1 tries to aggregate the duration across these mixed statement types, the PRAGMA result may not have the expected `meta.duration` field, causing the TypeError.

## The Fix

### 1. Separate PRAGMA from CREATE Statements

Changed from using `db.exec()` with mixed statements to:

```typescript
// Execute PRAGMA separately using prepare().run()
await db.prepare(`PRAGMA foreign_keys = ON`).run();

// Then execute CREATE statements in a separate exec() call
await db.exec(`
  CREATE TABLE IF NOT EXISTS shops (...);
  CREATE TABLE IF NOT EXISTS merchant_domains (...);
  ...
`);
```

### 2. Use prepare().run() for Single Statements

For ALTER TABLE statements in `addColumnIfMissing()`, changed from:

```typescript
await db.exec(ddl);  // ddl = "ALTER TABLE ... ADD COLUMN ..."
```

To:

```typescript
await db.prepare(ddl).run();
```

This is more appropriate for single statements and avoids the multi-statement aggregation logic entirely.

## Why This Fix Works

1. **Homogeneous statement batches**: The `exec()` call now only contains CREATE statements, which all return results with consistent meta structures
2. **No aggregation for single statements**: Using `prepare().run()` for single statements avoids the aggregation logic altogether
3. **Proper API usage**: `db.exec()` is designed for multi-statement DDL batches, while `db.prepare().run()` is for single statements

## Impact

- **Before**: All endpoints using D1 failed with 500 errors during schema initialization
- **After**: Schema initialization completes successfully, endpoints return proper responses

## Affected Files

- `apps/control-plane/src/lib/schema.ts`: Fixed in the `ensureSchema()` and `addColumnIfMissing()` functions

## Related Information

- Cloudflare D1 API changes: https://developers.cloudflare.com/d1/platform/release-notes/
- D1 Return Objects: https://developers.cloudflare.com/d1/worker-api/return-object/
- Compatibility dates: The project uses `compatibility_date: "2024-04-01"` which includes D1 API changes

## Prevention

When working with D1 in the future:

1. **Keep PRAGMA statements separate** from DDL operations
2. **Use `db.prepare().run()`** for single statements
3. **Use `db.exec()`** only for batches of homogeneous statement types (e.g., all CREATE, all INSERT)
4. **Test schema initialization** explicitly when making D1-related changes
5. **Be aware of compatibility_date** impacts on D1 behavior
