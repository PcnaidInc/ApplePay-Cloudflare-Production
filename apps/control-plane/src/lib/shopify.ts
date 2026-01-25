export function isValidShopDomain(shop: string): boolean {
  return /^[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com$/.test(shop);
}

export function buildShopifyAuthorizeUrl(args: {
  shop: string;
  apiKey: string;
  scopes: string;
  redirectUri: string;
  state: string;
}): string {
  const { shop, apiKey, scopes, redirectUri, state } = args;
  const u = new URL(`https://${shop}/admin/oauth/authorize`);
  u.searchParams.set('client_id', apiKey);
  u.searchParams.set('scope', scopes);
  u.searchParams.set('redirect_uri', redirectUri);
  u.searchParams.set('state', state);
  u.searchParams.append('grant_options[]', 'per-user');
  return u.toString();
}

export async function exchangeAccessToken(args: {
  shop: string;
  apiKey: string;
  apiSecret: string;
  code: string;
}): Promise<{ accessToken: string; scope: string }> {
  const { shop, apiKey, apiSecret, code } = args;
  const res = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: apiKey, client_secret: apiSecret, code }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to exchange access token (${res.status}): ${text}`);
  }
  const json = (await res.json()) as { access_token: string; scope: string };
  return { accessToken: json.access_token, scope: json.scope };
}

export async function shopifyGraphql<T>(args: {
  shop: string;
  accessToken: string;
  apiVersion: string;
  query: string;
  variables?: Record<string, any>;
}): Promise<T> {
  const { shop, accessToken, apiVersion, query, variables } = args;
  const res = await fetch(`https://${shop}/admin/api/${apiVersion}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = (await res.json()) as { data?: T; errors?: any[] };
  if (!res.ok) {
    throw new Error(`Shopify GraphQL error (${res.status}): ${JSON.stringify(json)}`);
  }
  if (json.errors) {
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}

export async function getShopInfo(args: {
  shop: string;
  accessToken: string;
  apiVersion: string;
}): Promise<{ shopId: string; name: string; primaryDomainHost: string | null }> {

  const isMyshopify = (host: string | null | undefined) => !!host && host.endsWith('.myshopify.com');

  // 1) Primary path: Shopify GraphQL shop.primaryDomain
  const base = await shopifyGraphql<{
    shop: {
      id: string;
      name: string;
      primaryDomain: { host: string; url?: string | null; sslEnabled?: boolean | null } | null;
    };
  }>({
    ...args,
    query: `query {
      shop {
        id
        name
        primaryDomain { host url sslEnabled }
      }
    }`,
    variables: {},
  });

  let bestHost: string | null = base.shop.primaryDomain?.host ?? null;

  // 2) Fallback: GraphQL shop.domains (more reliable in some Shopify stores)
  if (!bestHost || isMyshopify(bestHost)) {
    try {
      const dom = await shopifyGraphql<{
        shop: {
          domains: Array<{ host: string; url: string; sslEnabled: boolean; isPrimary?: boolean | null }>;
        };
      }>({
        ...args,
        query: `query {
          shop {
            domains {
              host
              url
              sslEnabled
              isPrimary
            }
          }
        }`,
        variables: {},
      });

      const candidates = (dom.shop.domains ?? []).filter((d) => !!d.host && !isMyshopify(d.host) && d.sslEnabled);
      const primary = candidates.find((d) => d.isPrimary) ?? candidates[0];
      if (primary?.host) bestHost = primary.host;
    } catch {
      // Not all API versions expose shop.domains. We'll fall back to REST below.
    }
  }

  // 3) Final fallback: REST /shop.json (domain is the current primary domain)
  if (!bestHost || isMyshopify(bestHost)) {
    try {
      const res = await fetch(`https://${args.shop}/admin/api/${args.apiVersion}/shop.json`, {
        headers: {
          'X-Shopify-Access-Token': args.accessToken,
          Accept: 'application/json',
        },
      });
      if (res.ok) {
        const json = (await res.json()) as any;
        const domain = (json?.shop?.domain as string | undefined) ?? null;
        if (domain && !isMyshopify(domain)) bestHost = domain;
      }
    } catch {
      // ignore
    }
  }

  return {
    shopId: base.shop.id,
    name: base.shop.name,
    primaryDomainHost: bestHost,
  };
}

export async function registerAppUninstalledWebhook(args: {
  shop: string;
  accessToken: string;
  apiVersion: string;
  callbackUrl: string;
}): Promise<void> {
  // GraphQL webhook registration
  const mutation = `mutation webhookSubscriptionCreate($topic: WebhookSubscriptionTopic!, $webhookSubscription: WebhookSubscriptionInput!) {
    webhookSubscriptionCreate(topic: $topic, webhookSubscription: $webhookSubscription) {
      userErrors { field message }
      webhookSubscription { id }
    }
  }`;

  const variables = {
    topic: 'APP_UNINSTALLED',
    webhookSubscription: {
      callbackUrl: args.callbackUrl,
      format: 'JSON',
    },
  };

  const data = await shopifyGraphql<any>({
    shop: args.shop,
    accessToken: args.accessToken,
    apiVersion: args.apiVersion,
    query: mutation,
    variables,
  });

  const errors = data.webhookSubscriptionCreate?.userErrors ?? [];
  if (errors.length) {
    throw new Error(`Webhook registration error: ${JSON.stringify(errors)}`);
  }
}
