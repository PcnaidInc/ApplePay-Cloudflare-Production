import { useCallback } from 'react';
import { getSessionToken } from '@shopify/app-bridge/utilities';
import { useAppBridge } from '../context/appBridge';

type AuthenticatedFetch = (url: string, init?: RequestInit) => Promise<Response>;

/**
 * Custom hook that provides an authenticated fetch function.
 *
 * Shopify embedded apps must send a short-lived session token (JWT) on every
 * request to protected backend routes via:
 *   Authorization: Bearer <token>
 *
 * This wrapper also:
 * - sets a sane default Accept header for JSON APIs
 * - adds X-Requested-With to avoid auth redirect loops in some middleware stacks
 * - only auto-sets Content-Type when you're sending a string body
 */
export function useAuthenticatedFetch(): AuthenticatedFetch {
  const app = useAppBridge();

  return useCallback(
    async (url: string, init: RequestInit = {}): Promise<Response> => {
      const token = await getSessionToken(app);

      // If this ever happens, don't send a broken request (it would become "Bearer ").
      if (!token || typeof token !== 'string' || token.trim().length === 0) {
        throw new Error('Failed to obtain Shopify session token (empty token).');
      }

      const headers = new Headers(init.headers);

      headers.set('Authorization', `Bearer ${token}`);
      headers.set('X-Requested-With', 'XMLHttpRequest');

      // Default JSON expectations unless caller overrides.
      if (!headers.has('Accept')) headers.set('Accept', 'application/json');

      // Only assume JSON if the body is a string (we don't want to break FormData uploads).
      if (typeof init.body === 'string' && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }

      return fetch(url, {
        ...init,
        headers,
      });
    },
    [app],
  );
}