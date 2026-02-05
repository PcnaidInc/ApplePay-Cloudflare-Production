/**
 * Middleware for requiring Shopify session token authentication.
 * Applied to all /api/* routes except whitelisted public endpoints.
 */

import type { Context, Next, Env } from 'hono';
import {
  extractBearerToken,
  verifySessionToken,
  extractShopFromPayload,
  isXhrRequest,
  type ShopifySessionPayload,
} from '../auth/sessionToken';

type ShopifyEnv = {
  SHOPIFY_API_KEY: string;
  SHOPIFY_API_SECRET: string;
};

type SessionVariables = {
  shopifySession?: { payload: ShopifySessionPayload; shop: string };
};

/**
 * Middleware that requires a valid Shopify session token.
 * 
 * For XHR/fetch requests with invalid/missing tokens:
 *   - Returns 401 with X-Shopify-Retry-Invalid-Session-Request: 1
 *   - This triggers App Bridge to refresh the token and retry
 * 
 * For document navigation with invalid/missing tokens:
 *   - Returns 401 with error message (redirect handled by frontend)
 * 
 * On success:
 *   - Attaches 'shopifySession' to context with { payload, shop }
 */
export async function requireShopifySession(
  c: Context<{ Bindings: ShopifyEnv; Variables: SessionVariables }>, 
  next: Next
) {
  const authHeader = c.req.header('Authorization');
  const token = extractBearerToken(authHeader);
  
  // Compute isXhr once at the beginning to avoid duplicate work
  const isXhr = isXhrRequest(c.req.raw.headers);

  if (!token) {
    if (isXhr) {
      c.header('X-Shopify-Retry-Invalid-Session-Request', '1');
    }
    return c.json({ error: 'Missing Authorization: Bearer <token>' }, 401);
  }

  let payload: ShopifySessionPayload;
  try {
    payload = await verifySessionToken(token, c.env.SHOPIFY_API_KEY, c.env.SHOPIFY_API_SECRET);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Invalid session token';

    // Log token verification failures for observability without exposing the token
    console.error('Shopify session token verification failed', {
      errorMessage,
      isXhr,
      method: c.req.method,
      path: c.req.path,
    });

    if (isXhr) {
      c.header('X-Shopify-Retry-Invalid-Session-Request', '1');
    }
    return c.json({ error: `Invalid Shopify session token: ${errorMessage}` }, 401);
  }

  // Extract shop domain from token payload
  let shop: string;
  try {
    shop = extractShopFromPayload(payload);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unable to extract shop';
    return c.json({ error: errorMessage }, 401);
  }

  // Attach session info to context for downstream handlers
  c.set('shopifySession', { payload, shop });

  await next();
}

/**
 * Helper to get the authenticated session from context.
 * Should only be called after requireShopifySession middleware.
 */
export function getShopifySession(c: Context<{ Variables: SessionVariables }>): { payload: ShopifySessionPayload; shop: string } {
  const session = c.get('shopifySession');
  if (!session) {
    throw new Error('shopifySession not found in context - did you apply requireShopifySession middleware?');
  }
  return session;
}
