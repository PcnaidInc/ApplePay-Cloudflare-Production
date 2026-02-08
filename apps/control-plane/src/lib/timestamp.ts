/**
 * Centralized timestamp utilities for consistent datetime handling
 * across the application and Oracle database.
 * 
 * Standard format: ISO 8601 with millisecond precision and UTC timezone
 * Example: 2024-01-15T10:30:45.123Z
 */

/**
 * Oracle timestamp format string for TO_TIMESTAMP_TZ and TO_CHAR
 * Matches JavaScript's toISOString() format with millisecond precision
 */
export const ORACLE_TIMESTAMP_FORMAT = 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"';

/**
 * Returns current timestamp in ISO 8601 format with millisecond precision
 * Always returns UTC timezone (Z suffix)
 * 
 * Format: YYYY-MM-DDTHH:MM:SS.sssZ
 * Example: 2024-01-15T10:30:45.123Z
 * 
 * This is the standard format used throughout the application:
 * - JavaScript: Date.toISOString()
 * - Oracle: TO_TIMESTAMP_TZ with YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"
 * - TypeScript types: string (ISO 8601)
 */
export function nowIso(): string {
  return new Date().toISOString();
}

/**
 * Converts a Date object to ISO 8601 string with millisecond precision
 * Always returns UTC timezone (Z suffix)
 * 
 * @param date - Date object to convert
 * @returns ISO 8601 timestamp string
 */
export function toIsoString(date: Date): string {
  return date.toISOString();
}

/**
 * Parses an ISO 8601 timestamp string to a Date object
 * Handles both with and without milliseconds
 * 
 * @param isoString - ISO 8601 timestamp string
 * @returns Date object or null if invalid
 */
export function fromIsoString(isoString: string): Date | null {
  try {
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}

/**
 * Validates that a string is a valid ISO 8601 timestamp
 * 
 * @param value - String to validate
 * @returns true if valid ISO 8601 timestamp
 */
export function isValidIsoTimestamp(value: string): boolean {
  if (!value || typeof value !== 'string') {
    return false;
  }
  
  // Check format: YYYY-MM-DDTHH:MM:SS(.sss)Z
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
  if (!isoRegex.test(value)) {
    return false;
  }
  
  // Validate the date is actually valid
  const date = fromIsoString(value);
  return date !== null;
}

/**
 * Ensures a timestamp value is in standard ISO format
 * If already valid ISO, returns as-is
 * If Date object, converts to ISO
 * If invalid, returns current timestamp
 * 
 * @param value - Timestamp value (ISO string, Date, or unknown)
 * @returns Valid ISO 8601 timestamp string
 */
export function ensureIsoTimestamp(value: unknown): string {
  if (typeof value === 'string' && isValidIsoTimestamp(value)) {
    return value;
  }
  
  if (value instanceof Date) {
    return toIsoString(value);
  }
  
  // Fallback to current timestamp
  return nowIso();
}

/**
 * Oracle SQL helper: wraps a bind parameter as TIMESTAMP WITH TIME ZONE.
 * Use this when binding ISO 8601 timestamp strings into Oracle SQL.
 * 
 * @param bindName - Name of the SQL bind parameter (referenced as :{bindName})
 * @returns Oracle TO_TIMESTAMP_TZ SQL fragment referencing :{bindName}
 * 
 * @example
 * const sql = `UPDATE shops SET updated_at = ${toOracleTimestampSql('updatedAt')}`;
 * // Results in: UPDATE shops SET updated_at = TO_TIMESTAMP_TZ(:updatedAt, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"')
 */
export function toOracleTimestampSql(bindName: string): string {
  return `TO_TIMESTAMP_TZ(:${bindName}, '${ORACLE_TIMESTAMP_FORMAT}')`;
}

/**
 * Oracle SQL helper: Formats Oracle TIMESTAMP WITH TIME ZONE as ISO string
 * Use this in SELECT queries
 * 
 * @param columnName - Oracle column name
 * @returns Oracle TO_CHAR SQL fragment with quoted alias
 * 
 * @example
 * const sql = `SELECT ${fromOracleTimestamp('created_at')} FROM shops`;
 * // Returns: TO_CHAR(created_at, 'YYYY-MM-DD"T"HH24:MI:SS.FF3"Z"') AS "created_at"
 */
export function fromOracleTimestampSql(columnName: string): string {
  return `TO_CHAR(${columnName}, '${ORACLE_TIMESTAMP_FORMAT}') AS "${columnName}"`;
}
