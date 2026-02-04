import { base64UrlDecodeToBytes, bytesToUtf8, utf8ToBytes } from './base64url';
import { hmacSha256, timingSafeEqual } from './security';

export type ShopifySessionTokenPayload = {
  iss: string;
  dest: string;
  aud: string;
  sub: string;
  exp: number;
  nbf: number;
  iat: number;
  jti: string;
  sid?: string;
};

// Shopify session tokens are short-lived and can be sensitive to minor clock drift.
// Allow a small skew window to prevent intermittent 401s when nbf is slightly "in the future".
const CLOCK_SKEW_SECONDS = 60;

export async function verifyShopifySessionToken(
  token: string,
  apiKey: string,
  apiSecret: string,
): Promise<ShopifySessionTokenPayload> {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid session token');

  const headerJson = JSON.parse(bytesToUtf8(base64UrlDecodeToBytes(parts[0])));
  if (headerJson.alg !== 'HS256') throw new Error(`Unexpected JWT alg: ${headerJson.alg}`);

  const payload = JSON.parse(bytesToUtf8(base64UrlDecodeToBytes(parts[1]))) as ShopifySessionTokenPayload;

  if (payload.aud !== apiKey) throw new Error('Invalid audience');

  const now = Math.floor(Date.now() / 1000);

  // Expired if it's more than CLOCK_SKEW_SECONDS in the past.
  if (payload.exp <= now - CLOCK_SKEW_SECONDS) throw new Error('Session token expired');

  // Not yet valid if it's more than CLOCK_SKEW_SECONDS in the future.
  if (payload.nbf && payload.nbf > now + CLOCK_SKEW_SECONDS) throw new Error('Session token not yet valid');

  const signingInput = `${parts[0]}.${parts[1]}`;
  const sigBytes = base64UrlDecodeToBytes(parts[2]);
  const expected = await hmacSha256(utf8ToBytes(apiSecret), utf8ToBytes(signingInput));

  if (!timingSafeEqual(sigBytes, expected)) throw new Error('Invalid session token signature');

  return payload;
}
