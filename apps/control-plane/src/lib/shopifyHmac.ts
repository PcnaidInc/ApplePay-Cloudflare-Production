import { utf8ToBytes } from './base64url';
import { hmacSha256, timingSafeEqual } from './security';

function hexToBytes(hex: string): Uint8Array {
  const clean = hex.trim();
  if (clean.length % 2 !== 0) throw new Error('Invalid hex string length');
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.substr(i * 2, 2), 16);
  }
  return out;
}

export async function verifyShopifyHmac(args: {
  url: URL;
  apiSecret: string;
}): Promise<boolean> {
  const sp = new URLSearchParams(args.url.search);
  const hmac = sp.get('hmac');
  if (!hmac) return false;

  sp.delete('hmac');
  sp.delete('signature');

  // Shopify expects sorted lexicographically by key
  const pairs = Array.from(sp.entries()).sort(([a], [b]) => a.localeCompare(b));
  const message = pairs
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

  const computed = await hmacSha256(utf8ToBytes(args.apiSecret), utf8ToBytes(message));
  const received = hexToBytes(hmac);
  return timingSafeEqual(computed, received);
}

// Shopify webhooks sign the raw body and deliver base64 in header.
export async function verifyShopifyWebhookHmac(args: {
  apiSecret: string;
  rawBody: Uint8Array;
  hmacHeader: string | null;
}): Promise<boolean> {
  if (!args.hmacHeader) return false;
  const computed = await hmacSha256(utf8ToBytes(args.apiSecret), args.rawBody);
  // header is base64
  const received = Uint8Array.from(atob(args.hmacHeader), (c) => c.charCodeAt(0));
  return timingSafeEqual(computed, received);
}
