// FILE: apps/admin-ui/src/hooks/useAuthenticatedFetch.ts
import { useCallback } from 'react';
import { getSessionToken } from '@shopify/app-bridge/utilities';
import { Redirect } from '@shopify/app-bridge/actions';
import { useAppBridge } from '../context/appBridge';

function getShopAndHostFromUrl(): { shop: string | null; host: string | null } {
  const params = new URLSearchParams(window.location.search);
  return {
    shop: params.get('shop'),
    host: params.get('host'),
  };
}

function redirectToAuth(app: ReturnType<typeof useAppBridge>) {
  const { shop, host } = getShopAndHostFromUrl();
  if (!shop || !host) return;

  const authUrl = new URL('/auth', window.location.origin);
  authUrl.searchParams.set('shop', shop);
  authUrl.searchParams.set('host', host);

  // Force TOP-level redirect (break out of the Shopify Admin iframe safely)
  Redirect.create(app).dispatch(Redirect.Action.REMOTE, authUrl.toString());
}

/**
 * Provides an authenticated fetch that:
 *  - injects Shopify session token
 *  - if we get 401 from our API, kicks off OAuth again
 */
export function useAuthenticatedFetch() {
  const app = useAppBridge();

  const authenticatedFetch = useCallback(
    async (url: string, init: RequestInit = {}): Promise<Response> => {
      // Only apply this logic to same-origin API calls.
      const resolved = new URL(url, window.location.origin);
      const isSameOrigin = resolved.origin === window.location.origin;
      const isApiCall = resolved.pathname.startsWith('/api/');
      const shouldAuth = isSameOrigin && isApiCall;

      if (!shouldAuth) {
        return fetch(url, init);
      }

      let token: string;
      try {
        token = await getSessionToken(app);
      } catch (err) {
        // If we can't get a token, we're not properly embedded — best effort: restart auth.
        redirectToAuth(app);
        throw err;
      }

      const headers = new Headers(init.headers);
      headers.set('Authorization', `Bearer ${token}`);
      if (!headers.has('Accept')) headers.set('Accept', 'application/json');

      const res = await fetch(url, { ...init, headers });

      if (res.status === 401) {
        // Read the error message without consuming the original response body
        let errorMessage = '';
        try {
          const cloned = res.clone();
          const ct = cloned.headers.get('content-type') || '';
          if (ct.includes('application/json')) {
            const body = (await cloned.json().catch(() => null)) as { error?: unknown } | null;
            if (body && typeof body.error === 'string') errorMessage = body.error;
          } else {
            errorMessage = await cloned.text().catch(() => '');
          }
        } catch {
          // ignore
        }

        // These are the “we should redo OAuth” cases.
        if (
          errorMessage.includes('App not installed') ||
          errorMessage.includes('Invalid Shopify session token') ||
          errorMessage.includes('Missing Authorization')
        ) {
          redirectToAuth(app);
        }
      }

      return res;
    },
    [app]
  );

  return authenticatedFetch;
}
