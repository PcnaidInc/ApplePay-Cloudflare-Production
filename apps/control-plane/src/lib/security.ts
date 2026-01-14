import { utf8ToBytes } from './base64url';

export function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function hmacSha256(key: Uint8Array, message: Uint8Array): Promise<Uint8Array> {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, message);
  return new Uint8Array(sig);
}

export async function sha256Bytes(message: Uint8Array): Promise<Uint8Array> {
  const digest = await crypto.subtle.digest('SHA-256', message);
  return new Uint8Array(digest);
}

export async function verifyShopifyHmac(params: URLSearchParams, apiSecret: string): Promise<boolean> {
  const hmac = params.get('hmac');
  if (!hmac) return false;

  // Shopify computes the HMAC over the query string, excluding hmac & signature.
  // Sort lexicographically.
  const filtered: [string, string][] = [];
  for (const [k, v] of params.entries()) {
    if (k === 'hmac' || k === 'signature') continue;
    filtered.push([k, v]);
  }
  filtered.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));

  const message = filtered.map(([k, v]) => `${k}=${v}`).join('&');
  const expected = await hmacSha256(utf8ToBytes(apiSecret), utf8ToBytes(message));

  // Shopify uses hex digest
  const expectedHex = [...expected].map((b) => b.toString(16).padStart(2, '0')).join('');
  // Compare lowercased
  return expectedHex === hmac.toLowerCase();
}

export async function verifyWebhookHmac(rawBody: ArrayBuffer, hmacHeader: string | null, apiSecret: string): Promise<boolean> {
  if (!hmacHeader) return false;
  const expected = await hmacSha256(utf8ToBytes(apiSecret), new Uint8Array(rawBody));
  const expectedB64 = btoa(String.fromCharCode(...expected));
  return expectedB64 === hmacHeader;
}
