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

export async function verifyShopifySessionToken(token: string, apiKey: string, apiSecret: string): Promise<ShopifySessionTokenPayload> {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid session token');

  const headerJson = JSON.parse(bytesToUtf8(base64UrlDecodeToBytes(parts[0])));
  if (headerJson.alg !== 'HS256') throw new Error(`Unexpected JWT alg: ${headerJson.alg}`);

  const payload = JSON.parse(bytesToUtf8(base64UrlDecodeToBytes(parts[1]))) as ShopifySessionTokenPayload;
  if (payload.aud !== apiKey) throw new Error('Invalid audience');
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp <= now) throw new Error('Session token expired');
  if (payload.nbf && payload.nbf > now) throw new Error('Session token not yet valid');

  const signingInput = `${parts[0]}.${parts[1]}`;
  const sigBytes = base64UrlDecodeToBytes(parts[2]);
  const expected = await hmacSha256(utf8ToBytes(apiSecret), utf8ToBytes(signingInput));
  if (!timingSafeEqual(sigBytes, expected)) throw new Error('Invalid session token signature');

  return payload;
}
