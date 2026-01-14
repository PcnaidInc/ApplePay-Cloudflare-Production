import { useEffect, useMemo, useState } from 'react';
import createApp from '@shopify/app-bridge';
import { getSessionToken } from '@shopify/app-bridge/utilities';
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
      } catch (e: any) {
        setConfigError(e?.message ?? String(e));
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

  async function apiJson<T>(path: string, init?: RequestInit): Promise<T> {
    if (!appBridge) throw new Error('App Bridge is not initialized (missing host/shop).');
    const token = await getSessionToken(appBridge);
    const res = await fetch(path, {
      ...init,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`${path} failed (${res.status}): ${text || res.statusText}`);
    }
    return (await res.json()) as T;
  }

  async function refresh() {
    setBusy(true);
    setErrorBanner(null);
    setInfoBanner(null);
    try {
      const shopData = await apiJson<ShopInfo>('/api/shop');
      setShopInfo(shopData);
      const statusData = await apiJson<ApplePayStatus>('/api/applepay/status');
      setStatus(statusData);
    } catch (e: any) {
      setErrorBanner(e?.message ?? String(e));
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
    } catch (e: any) {
      setErrorBanner(e?.message ?? String(e));
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
