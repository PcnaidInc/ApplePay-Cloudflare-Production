# Timestamp Standardization Guide

## Overview

This application uses a **standardized ISO 8601 timestamp format** throughout the entire stack to ensure consistency between JavaScript/TypeScript, Oracle database, and API responses.

## Standard Format

**Format:** `YYYY-MM-DDTHH:MM:SS.sssZ`  
**Example:** `2024-01-15T10:30:45.123Z`

- **Date:** `YYYY-MM-DD` (4-digit year, 2-digit month, 2-digit day)
- **Time:** `HH:MM:SS.sss` (24-hour format with millisecond precision)
- **Timezone:** Always `Z` (UTC/Zulu time)

## Why ISO 8601 with UTC?

1. **Unambiguous:** No timezone confusion - all timestamps are UTC
2. **Sortable:** String comparison works for chronological ordering
3. **Standard:** Native JavaScript support via `Date.toISOString()`
4. **Oracle Compatible:** Maps cleanly to `TIMESTAMP WITH TIME ZONE`
5. **API Friendly:** JSON-safe and widely understood

## Usage Guidelines

### 1. Generating Timestamps (TypeScript/JavaScript)

**✅ CORRECT:**
```typescript
import { nowIso } from './lib/timestamp';

const timestamp = nowIso();
// Returns: "2024-01-15T10:30:45.123Z"
```

**❌ INCORRECT:**
```typescript
// Don't use local timezone
const timestamp = new Date().toString(); // "Mon Jan 15 2024 10:30:45 GMT-0500"

// Don't use non-standard formats
const timestamp = new Date().toLocaleString(); // "1/15/2024, 10:30:45 AM"

// Don't lose timezone information
const timestamp = new Date().toISOString().slice(0, 19); // Missing 'Z'
```

### 2. Storing in Oracle Database

**Schema:** All timestamp columns use `TIMESTAMP WITH TIME ZONE`:
```sql
CREATE TABLE shops (
  installed_at TIMESTAMP WITH TIME ZONE NOT NULL,
  uninstalled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

**Inserting/Updating (with bind parameters):**
```typescript
import { nowIso, ORACLE_TIMESTAMP_FORMAT } from './lib/timestamp';

const now = nowIso();
const sql = `
  UPDATE shops 
  SET updated_at = TO_TIMESTAMP_TZ(:updated_at, '${ORACLE_TIMESTAMP_FORMAT}')
  WHERE shop = :shop
`;

await client.execute(sql, {
  updated_at: now,  // "2024-01-15T10:30:45.123Z"
  shop: 'example.myshopify.com'
});
```

**Querying (with formatted output):**
```typescript
import { ORACLE_TIMESTAMP_FORMAT } from './lib/timestamp';

const sql = `
  SELECT 
    shop,
    TO_CHAR(installed_at, '${ORACLE_TIMESTAMP_FORMAT}') AS "installed_at",
    TO_CHAR(updated_at, '${ORACLE_TIMESTAMP_FORMAT}') AS "updated_at"
  FROM shops
  WHERE shop = :shop
`;

const row = await client.queryOne(sql, { shop: 'example.myshopify.com' });
// row.installed_at: "2024-01-15T10:30:45.123Z"
```

### 3. TypeScript Type Definitions

All timestamps are typed as `string` (ISO 8601):

```typescript
export type ShopRow = {
  shop: string;
  shop_id: string;
  shop_name: string;
  access_token: string;
  scopes: string;
  installed_at: string;        // ISO 8601
  uninstalled_at: string | null; // ISO 8601 or null
};

export type MerchantDomainRow = {
  id: number;
  // ... other fields
  apple_last_checked_at: string | null; // ISO 8601 or null
  created_at: string;           // ISO 8601
  updated_at: string;           // ISO 8601
};
```

### 4. API Responses

All API responses include timestamps in ISO 8601 format:

**✅ CORRECT:**
```json
{
  "shop": "example.myshopify.com",
  "installed_at": "2024-01-15T10:30:45.123Z",
  "updated_at": "2024-01-15T11:15:30.456Z"
}
```

**❌ INCORRECT:**
```json
{
  "shop": "example.myshopify.com",
  "installed_at": "2024-01-15 10:30:45",  // Missing timezone
  "updated_at": 1705319730456            // Unix timestamp
}
```

### 5. Logging

Use `nowIso()` for all log timestamps:

```typescript
import { nowIso } from './lib/timestamp';

console.log(JSON.stringify({
  ts: nowIso(),
  level: 'info',
  msg: 'Operation completed',
  requestId: '...'
}));
```

## Validation and Conversion

### Validating Timestamps

```typescript
import { isValidIsoTimestamp } from './lib/timestamp';

if (!isValidIsoTimestamp(userInput)) {
  throw new Error('Invalid timestamp format. Expected ISO 8601.');
}
```

### Converting to Date Objects

```typescript
import { fromIsoString } from './lib/timestamp';

const isoTimestamp = "2024-01-15T10:30:45.123Z";
const date = fromIsoString(isoTimestamp);

if (date) {
  console.log(date.getFullYear()); // 2024
}
```

### Ensuring ISO Format

```typescript
import { ensureIsoTimestamp } from './lib/timestamp';

// Handles various input types
const timestamp1 = ensureIsoTimestamp("2024-01-15T10:30:45.123Z"); // Returns as-is
const timestamp2 = ensureIsoTimestamp(new Date());                // Converts to ISO
const timestamp3 = ensureIsoTimestamp("invalid");                 // Returns current time
```

## Common Pitfalls

### ❌ Don't Use Local Timezones

```typescript
// WRONG: This includes local timezone offset
const timestamp = new Date().toString();
// "Mon Jan 15 2024 10:30:45 GMT-0500 (Eastern Standard Time)"
```

### ❌ Don't Truncate ISO Strings

```typescript
// WRONG: Missing milliseconds and timezone
const timestamp = new Date().toISOString().slice(0, 19);
// "2024-01-15T10:30:45" (missing .123Z)
```

### ❌ Don't Use Unix Timestamps

```typescript
// WRONG: Not human-readable, timezone-ambiguous
const timestamp = Date.now();
// 1705319730456
```

### ❌ Don't Mix Formats

```typescript
// WRONG: Inconsistent formats in same codebase
const timestamp1 = "2024-01-15T10:30:45.123Z"; // ISO 8601
const timestamp2 = "01/15/2024 10:30:45";      // US format
const timestamp3 = "2024-01-15 10:30:45";      // SQL format (no TZ)
```

## Migration Notes

### Converting Existing Code

If you find code using non-standard timestamp formats:

1. Replace with `nowIso()` from `./lib/timestamp`
2. Update TypeScript types to use `string` for timestamps
3. Ensure Oracle queries use `TO_TIMESTAMP_TZ` for input and `TO_CHAR` for output
4. Validate API contracts to ensure ISO 8601 format

### Testing Timestamps

```typescript
import { nowIso, isValidIsoTimestamp } from './lib/timestamp';

describe('Timestamp handling', () => {
  it('generates valid ISO 8601 timestamps', () => {
    const timestamp = nowIso();
    expect(isValidIsoTimestamp(timestamp)).toBe(true);
    expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });
  
  it('stores and retrieves timestamps correctly', async () => {
    const now = nowIso();
    await upsertShop(client, {
      shop: 'test.myshopify.com',
      installedAt: now,
      // ...
    });
    
    const shop = await getShopByShop(client, 'test.myshopify.com');
    expect(shop.installed_at).toBe(now);
  });
});
```

## Oracle Format Reference

### Constants

```typescript
// Oracle timestamp format string (from timestamp.ts)
export const ORACLE_TIMESTAMP_FORMAT = 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"';
```

### Format Breakdown

- `YYYY` - 4-digit year
- `-` - Literal hyphen
- `MM` - 2-digit month (01-12)
- `-` - Literal hyphen
- `DD` - 2-digit day (01-31)
- `"T"` - Literal 'T' character
- `HH24` - 2-digit hour (00-23, 24-hour format)
- `:` - Literal colon
- `MI` - 2-digit minute (00-59)
- `:` - Literal colon
- `SS` - 2-digit second (00-59)
- `.` - Literal period
- `FF3` - 3-digit fractional seconds (milliseconds, 000-999)
- `"Z"` - Literal 'Z' character (UTC indicator)

### Example Conversions

| ISO 8601 String | Oracle TIMESTAMP WITH TIME ZONE |
|----------------|--------------------------------|
| `2024-01-15T10:30:45.123Z` | `15-JAN-24 10.30.45.123000000 AM UTC` |
| `2024-12-31T23:59:59.999Z` | `31-DEC-24 11.59.59.999000000 PM UTC` |
| `2024-06-15T00:00:00.000Z` | `15-JUN-24 12.00.00.000000000 AM UTC` |

## Troubleshooting

### Issue: Timestamps don't match between application and database

**Symptom:** Timestamps stored in Oracle appear different when queried.

**Solution:** Ensure you're using `TO_CHAR` with the correct format string:
```sql
SELECT TO_CHAR(created_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"') AS "created_at" FROM shops;
```

### Issue: Invalid timestamp format error from Oracle

**Symptom:** Error like "ORA-01830: date format picture ends before converting entire input string"

**Solution:** Check that input timestamps are valid ISO 8601 and use `TO_TIMESTAMP_TZ` with the format string:
```typescript
const timestamp = nowIso(); // Ensure this is valid
const sql = `INSERT INTO shops (..., created_at) VALUES (..., TO_TIMESTAMP_TZ(:created_at, '${ORACLE_TIMESTAMP_FORMAT}'))`;
```

### Issue: Frontend displays wrong time

**Symptom:** Times appear off by several hours in the UI.

**Solution:** All timestamps are UTC. Display logic must convert to user's local timezone:
```typescript
// In frontend
const displayTime = new Date(isoTimestamp).toLocaleString();
```

### Issue: Comparison issues

**Symptom:** Timestamp comparisons don't work as expected.

**Solution:** Use Date objects for comparison:
```typescript
import { fromIsoString } from './lib/timestamp';

const date1 = fromIsoString(timestamp1);
const date2 = fromIsoString(timestamp2);

if (date1 && date2) {
  if (date1 > date2) {
    console.log('date1 is later');
  }
}
```

## Best Practices Summary

1. ✅ Always use `nowIso()` for generating timestamps
2. ✅ Always store as `TIMESTAMP WITH TIME ZONE` in Oracle
3. ✅ Always use `TO_TIMESTAMP_TZ` for input, `TO_CHAR` for output
4. ✅ Always type as `string` in TypeScript (ISO 8601 format)
5. ✅ Always validate user-provided timestamps
6. ✅ Always use UTC timezone (Z suffix)
7. ✅ Always include milliseconds (.sss)
8. ✅ Always use 24-hour format (HH not hh)
9. ✅ Always log timestamps in ISO 8601 format
10. ✅ Always document timestamp format expectations in API docs

## Related Files

- `apps/control-plane/src/lib/timestamp.ts` - Core timestamp utilities
- `apps/control-plane/src/lib/oracleDb.ts` - Oracle database access with timestamps
- `apps/control-plane/src/lib/util.ts` - Re-exports `nowIso()` for backward compatibility
- `apps/control-plane/oracle-migrations/001_initial_schema.sql` - Database schema with timestamp columns

## Questions?

If you're unsure about timestamp handling in a specific scenario, refer to this guide or consult the implementation in `timestamp.ts` for utility functions that handle common cases safely.
