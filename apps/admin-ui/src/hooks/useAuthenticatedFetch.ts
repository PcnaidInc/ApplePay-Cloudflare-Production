import { useCallback } from 'react';
import { getSessionToken } from '@shopify/app-bridge/utilities';
import { useAppBridge } from '../context/appBridge';

/**
 * Custom hook that provides an authenticated fetch function.
 * Automatically retrieves and injects Shopify session token into requests.
 */
export function useAuthenticatedFetch() {
  const app = useAppBridge();

  const authenticatedFetch = useCallback(
    async (url: string, init?: RequestInit): Promise<Response> => {
      // Get session token from App Bridge
      const token = await getSessionToken(app);

      // Merge headers with Authorization token
      const headers = new Headers(init?.headers);
      headers.set('Authorization', `Bearer ${token}`);

      // Execute fetch with authenticated headers
      return fetch(url, {
        ...init,
        headers,
      });
    },
    [app]
  );

  return authenticatedFetch;
}