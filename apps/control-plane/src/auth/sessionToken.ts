/**
 * Auth module for Shopify session token verification.
 * Centralizes session token parsing, validation, and shop extraction.
 */

import { verifyShopifySessionToken } from '../lib/shopifySessionToken';
import { normalizeHostname } from '../lib/domains';

export type ShopifySessionPayload = {
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

/**
 * Extract Bearer token from Authorization header
 */
export function extractBearerToken(authHeader: string | null | undefined): string | null {
  if (!authHeader) return null;
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
}

/**
 * Verify Shopify session token and return payload
 * @throws Error if token is invalid, expired, or signature mismatch
 */
export async function verifySessionToken(
  token: string,
  apiKey: string,
  apiSecret: string
): Promise<ShopifySessionPayload> {
  const payload = await verifyShopifySessionToken(token, apiKey, apiSecret);
  return payload as ShopifySessionPayload;
}

/**
 * Extract shop domain from session token payload.
 * Handles both classic embedded admin (dest/iss with shop.myshopify.com)
 * and new admin.shopify.com URLs.
 */
export function extractShopFromPayload(payload: ShopifySessionPayload): string {
  const candidates = [payload.dest, payload.iss].filter(Boolean) as string[];

  for (const candidate of candidates) {
    try {
      const u = new URL(candidate);
      const host = normalizeHostname(u.hostname);

      // Classic embedded admin: https://{shop}.myshopify.com/admin
      if (host.endsWith('.myshopify.com')) {
        return host;
      }

      // New admin: https://admin.shopify.com/store/<store>
      if (host === 'admin.shopify.com') {
        const parts = u.pathname.split('/').filter(Boolean);
        const storeIdx = parts.indexOf('store');
        const slug = storeIdx >= 0 ? parts[storeIdx + 1] : undefined;
        if (slug) {
          return `${normalizeHostname(slug)}.myshopify.com`;
        }
      }
    } catch {
      // Try next candidate
      continue;
    }
  }

  throw new Error('Unable to determine shop domain from session token payload');
}

/**
 * Check if the request is an XHR/fetch call (not a document navigation)
 */
export function isXhrRequest(headers: Headers): boolean {
  const accept = headers.get('accept') || '';
  const xRequestedWith = headers.get('x-requested-with') || '';
  
  // XHR/fetch typically accept JSON or have X-Requested-With header
  return (
    accept.includes('application/json') ||
    xRequestedWith.toLowerCase() === 'xmlhttprequest'
  );
}
