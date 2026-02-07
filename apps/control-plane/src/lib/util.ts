// Re-export timestamp utilities for backward compatibility
export { nowIso } from './timestamp';

export function randomState(bytes: number = 16): string {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  return Array.from(buf)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const bytes = new Uint8Array(hash);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Wraps a promise for error tracking. (OpenTelemetry removed)
 */
export async function performOp<T>(
  name: string,
  operation: () => Promise<T>
): Promise<T> {
  try {
    return await operation();
  } catch (err: any) {
    console.error(`[performOp:${name}]`, err);
    throw err;
  }
}
