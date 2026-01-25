import { useEffect, useMemo, useState } from 'react';
import createApp from '@shopify/app-bridge';
import { Redirect } from '@shopify/app-bridge/actions';
import { authenticatedFetch } from '@shopify/app-bridge/utilities';
import {
  Banner,
  BlockStack,
  Button,
  Card,
  Divider,
  InlineStack,
  Layout,
  Link,
  Page,
  Spinner,
  Text,
  List,
} from '@shopify/polaris';

type Config = {
  shopifyApiKey: string;
  appUrl: string;
};

type ShopInfo = {
  shop: string;
  shopId: string;
  shopName: string;
  primaryDomain: string | null;
};

type ApplePayStatus = {
  domain: string | null;
  status: string;
  lastError: string | null;
  cloudflareHostnameStatus: string | null;
  cloudflareSslStatus: string | null;
  dnsInstructions?: {
    recordType: 'CNAME' | 'ALIAS' | 'ANAME';
    host: string;
    value: string;
    note?: string;
  };
  appleMerchantId?: string;
};

function getQueryParam(name: string): string | null {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

export default function App() {
  const shop = getQueryParam('shop');
  const host = getQueryParam('host');

  const [config, setConfig] = useState<Config | null>(null);
  const [configError, setConfigError] = useState<string | null>(null);
  const [shopInfo, setShopInfo] = useState<ShopInfo | null>(null);
  const [status, setStatus] = useState<ApplePayStatus | null>(null);
  const [busy, setBusy] = useState<boolean>(false);
  const [infoBanner, setInfoBanner] = useState<string | null>(null);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/config', { headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(`Failed to load config (${res.status})`);
        const json = (await res.json()) as Config;
        setConfig(json);
      } catch (e: unknown) {
        setConfigError(e instanceof Error ? e.message : String(e));
      }
    })();
  }, []);

  const appBridge = useMemo(() => {
    if (!config || !host || !shop) return null;
    return createApp({
      apiKey: config.shopifyApiKey,
      host,
      forceRedirect: true,
    });
  }, [config, host, shop]);

  // App Bridge-aware fetch that injects a fresh session token automatically.
  const appFetch = useMemo(() => {
    if (!appBridge) return null;
    return authenticatedFetch(appBridge);
  }, [appBridge]);

  async function apiJson<T>(path: string, init?: RequestInit): Promise<T> {
    if (!appFetch) throw new Error('App Bridge is not initialized (missing host/shop).');
    const res = await appFetch(path, {
      ...init,
      headers: {
        Accept: 'application/json',
        ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
        ...(init?.headers ?? {}),
      },
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      let data: unknown = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = null;
      }
      const messageFromBody =
        data && typeof data === 'object' && 'error' in data ? String((data as { error?: unknown }).error) : '';
      const err = new Error(
        `${path} failed (${res.status}): ${messageFromBody || text || res.statusText}`,
      ) as Error & { status: number; body: string; data?: unknown };
      err.status = res.status;
      err.body = text;
      err.data = data;
      throw err;
    }
    return (await res.json()) as T;
  }


  function reauthenticate(reason?: string) {
    if (!config || !shop || !host) return;
    setInfoBanner(reason ?? 'Re-authenticating with Shopify…');

    const url = new URL('/auth', config.appUrl);
    url.searchParams.set('shop', shop);
    url.searchParams.set('host', host);

    // Prefer App Bridge's REMOTE redirect (official embedded-app way).
    try {
      if (appBridge) {
        const redirect = Redirect.create(appBridge);
        redirect.dispatch(Redirect.Action.REMOTE, url.toString());
        return;
      }
    } catch {
      // fall through
    }

    // Fallback: hard top-level navigation (works even if App Bridge isn't ready).
    try {
      if (window.top) {
        window.top.location.href = url.toString();
      } else {
        window.location.href = url.toString();
      }
    } catch {
      window.location.href = url.toString();
    }
  }

  async function refresh() {
    setBusy(true);
    setErrorBanner(null);
    setInfoBanner(null);
    try {
      const shopData = await apiJson<ShopInfo>('/api/shop');
      setShopInfo(shopData);
      const qs = shopData.primaryDomain
        ? `?domain=${encodeURIComponent(shopData.primaryDomain)}`
        : '';
      const statusData = await apiJson<ApplePayStatus>(`/api/applepay/status${qs}`);
      setStatus(statusData);
    } catch (e: unknown) {
      const statusCode = e && typeof e === 'object' && 'status' in e ? (e as { status: number }).status : undefined;
      const msg = e instanceof Error ? e.message : String(e);
      // If the shop is not in our DB yet (fresh D1, reinstall, etc.), kick off OAuth.
      if (statusCode === 401) {
        reauthenticate('Shop needs authentication. Redirecting to Shopify…');
        return;
      }
      setErrorBanner(msg);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    if (!appBridge) return;
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appBridge]);

  async function onboard() {
    setBusy(true);
    setErrorBanner(null);
    setInfoBanner(null);
    try {
      const res = await apiJson<ApplePayStatus>('/api/applepay/onboard', { method: 'POST' });
      setStatus(res);
      if (res.status === 'VERIFIED') {
        setInfoBanner('✅ Apple Pay domain verification is complete.');
      } else {
        setInfoBanner('Onboarding started. Follow the instructions below, then click Refresh.');
      }
    } catch (e: unknown) {
      const err = e as (Error & { data?: unknown });
      if (err?.data && typeof err.data === 'object') {
        const data = err.data as Partial<ApplePayStatus>;
        if (data.dnsInstructions || data.status || data.domain) {
          setStatus(data as ApplePayStatus);
          if (data.dnsInstructions) {
            setInfoBanner('DNS setup required. Follow the instructions below, then click Refresh.');
          }
        }
      }
      setErrorBanner(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  if (!shop || !host) {
    return (
      <Page title="Apple Pay Enablement">
        <Card>
          <BlockStack gap="400">
            <Text as="p">
              This app must be opened from within Shopify Admin.
            </Text>
            <Text as="p" tone="subdued">
              Missing <Text as="span" fontWeight="bold">shop</Text> or{' '}
              <Text as="span" fontWeight="bold">host</Text> URL parameters.
            </Text>
          </BlockStack>
        </Card>
      </Page>
    );
  }

  if (configError) {
    return (
      <Page title="Apple Pay Enablement">
        <Banner tone="critical" title="Failed to load app configuration">
          <p>{configError}</p>
        </Banner>
      </Page>
    );
  }

  if (!config || !appBridge) {
    return (
      <Page title="Apple Pay Enablement">
        <InlineStack gap="300" align="center" blockAlign="center">
          <Spinner size="small" />
          <Text as="p">Loading…</Text>
        </InlineStack>
      </Page>
    );
  }

  const primaryDomain = shopInfo?.primaryDomain ?? null;

  return (
    <Page
      title="Apple Pay Enablement"
      subtitle={shopInfo ? `${shopInfo.shopName} (${shopInfo.shop})` : shop}
      primaryAction={
        <Button onClick={refresh} disabled={busy}>
          Refresh
        </Button>
      }
    >
      <Layout>
        <Layout.Section>
          {errorBanner ? (
            <Banner tone="critical" title="Error">
              <p>{errorBanner}</p>
            </Banner>
          ) : null}

          {infoBanner ? (
            <Banner tone="success" title="Update">
              <p>{infoBanner}</p>
            </Banner>
          ) : null}

          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Current Store Domain
              </Text>
              <Text as="p">
                Primary domain:{' '}
                <Text as="span" fontWeight="bold">
                  {primaryDomain ?? 'No custom domain set'}
                </Text>
              </Text>
              <Divider />
              <InlineStack gap="300" align="start">
                <Button variant="primary" onClick={onboard} disabled={busy || !primaryDomain}>
                  Enable Apple Pay
                </Button>
                {!primaryDomain ? (
                  <Text as="p" tone="subdued">
                    Set a primary custom domain in Shopify before enabling Apple Pay.
                  </Text>
                ) : null}
              </InlineStack>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Status
              </Text>
              {!status ? (
                <InlineStack gap="300" align="start" blockAlign="center">
                  <Spinner size="small" />
                  <Text as="p">Loading status…</Text>
                </InlineStack>
              ) : (
                <BlockStack gap="300">
                  <Text as="p">
                    Domain: <Text as="span" fontWeight="bold">{status.domain ?? '—'}</Text>
                  </Text>
                  <Text as="p">
                    Apple status: <Text as="span" fontWeight="bold">{status.status}</Text>
                  </Text>
                  <Text as="p">
                    Cloudflare hostname: <Text as="span" fontWeight="bold">{status.cloudflareHostnameStatus ?? '—'}</Text>
                  </Text>
                  <Text as="p">
                    Cloudflare SSL: <Text as="span" fontWeight="bold">{status.cloudflareSslStatus ?? '—'}</Text>
                  </Text>
                  {status.lastError ? (
                    <Banner tone="warning" title="Last error">
                      <p>{status.lastError}</p>
                    </Banner>
                  ) : null}

                  {status.dnsInstructions ? (
                    <Card>
                      <BlockStack gap="200">
                        <Text as="h3" variant="headingSm">
                          DNS instructions
                        </Text>
                        <Text as="p">
                          Add a <Text as="span" fontWeight="bold">{status.dnsInstructions.recordType}</Text> record:
                        </Text>
                        <List>
                          <List.Item>
                            Host: <Text as="span" fontWeight="bold">{status.dnsInstructions.host}</Text>
                          </List.Item>
                          <List.Item>
                            Value: <Text as="span" fontWeight="bold">{status.dnsInstructions.value}</Text>
                          </List.Item>
                        </List>
                        {status.dnsInstructions.note ? (
                          <Text as="p" tone="subdued">
                            {status.dnsInstructions.note}
                          </Text>
                        ) : null}
                        <Text as="p" tone="subdued">
                          After DNS propagates, click <Text as="span" fontWeight="bold">Refresh</Text>, then click{' '}
                          <Text as="span" fontWeight="bold">Enable Apple Pay</Text> again.
                        </Text>
                      </BlockStack>
                    </Card>
                  ) : null}

                  <Text as="p" tone="subdued">
                    Need help? Contact support and include your shop domain ({shop}).
                  </Text>
                  <Text as="p" tone="subdued">
                    App URL: <Link url={config.appUrl} target="_blank">{config.appUrl}</Link>
                  </Text>
                </BlockStack>
              )}
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
