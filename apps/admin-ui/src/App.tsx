import { useCallback, useEffect, useMemo, useState } from 'react';
import createApp from '@shopify/app-bridge';
import { Redirect } from '@shopify/app-bridge/actions';
import { authenticatedFetch } from '@shopify/app-bridge/utilities';
import {
  Badge,
  Banner,
  BlockStack,
  Button,
  Card,
  Checkbox,
  Divider,
  InlineGrid,
  InlineStack,
  IndexTable,
  Layout,
  Modal,
  Page,
  Spinner,
  Text,
  TextField,
  Toast,
} from '@shopify/polaris';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

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

type DomainStatus = 'NOT_STARTED' | 'DNS_NOT_CONFIGURED' | 'PENDING' | 'IN_PROCESS' | 'VERIFIED' | 'ERROR' | 'UNREGISTERED';

type DomainListItem = {
  domain: string;
  status: DomainStatus;
  lastError: string | null;
  cloudflareHostnameStatus: string | null;
  cloudflareSslStatus: string | null;
  appleMerchantId: string | null;
  lastCheckedAt: string | null;
  createdAt: string;
};

type DomainDetails = DomainListItem & {
  dnsInstructions: {
    recordType: 'CNAME' | 'ALIAS' | 'ANAME';
    host: string;
    value: string;
    note?: string;
  };
  registrarInfo: {
    registrar: string | null;
    supported: boolean;
  } | null;
  cloudflareHostnameId: string | null;
};

type DomainScanResult = {
  registrar: string | null;
  supported: boolean;
  domainConnectUrl: string | null;
};

// -----------------------------------------------------------------------------
// Utility Functions
// -----------------------------------------------------------------------------

function getQueryParam(name: string): string | null {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function getStatusBadge(status: DomainStatus): 'success' | 'attention' | 'warning' | 'critical' | 'info' {
  switch (status) {
    case 'VERIFIED':
      return 'success';
    case 'IN_PROCESS':
    case 'PENDING':
      return 'info';
    case 'DNS_NOT_CONFIGURED':
      return 'attention';
    case 'ERROR':
      return 'critical';
    case 'UNREGISTERED':
      return 'warning';
    default:
      return 'info';
  }
}

function getStatusLabel(status: DomainStatus): string {
  switch (status) {
    case 'VERIFIED':
      return 'Registered/Completed';
    case 'IN_PROCESS':
    case 'PENDING':
      return 'In Process';
    case 'DNS_NOT_CONFIGURED':
      return 'DNS Not Configured';
    case 'ERROR':
      return 'Error';
    case 'UNREGISTERED':
      return 'Unregistered';
    case 'NOT_STARTED':
      return 'Not Started';
    default:
      return status;
  }
}

// -----------------------------------------------------------------------------
// Main App Component
// -----------------------------------------------------------------------------

export default function App() {
  const shop = getQueryParam('shop');
  const host = getQueryParam('host');

  const [config, setConfig] = useState<Config | null>(null);
  const [configError, setConfigError] = useState<string | null>(null);
  const [shopInfo, setShopInfo] = useState<ShopInfo | null>(null);
  const [domains, setDomains] = useState<DomainListItem[]>([]);
  const [busy, setBusy] = useState<boolean>(false);
  
  // Modal state
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<1 | 2>(1);
  const [newDomain, setNewDomain] = useState<string>('');
  const [scanResult, setScanResult] = useState<DomainScanResult | null>(null);
  const [scanningDomain, setScanningDomain] = useState<boolean>(false);
  const [dnsManuallyConfigured, setDnsManuallyConfigured] = useState<boolean>(false);
  const [domainConnectSuccess, setDomainConnectSuccess] = useState<boolean>(false);
  
  // Details panel state
  const [detailsDomain, setDetailsDomain] = useState<string | null>(null);
  const [domainDetails, setDomainDetails] = useState<DomainDetails | null>(null);
  
  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastError, setToastError] = useState<boolean>(false);

  // Load config
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

  // Initialize App Bridge
  const appBridge = useMemo(() => {
    if (!config || !host || !shop) return null;
    return createApp({
      apiKey: config.shopifyApiKey,
      host,
      forceRedirect: true,
    });
  }, [config, host, shop]);

  // App Bridge-aware fetch
  const appFetch = useMemo(() => {
    if (!appBridge) return null;
    return authenticatedFetch(appBridge);
  }, [appBridge]);

  // Generic API helper
  const apiJson = useCallback(async <T,>(path: string, init?: RequestInit): Promise<T> => {
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
  }, [appFetch]);

  // Re-authenticate with Shopify
  const reauthenticate = useCallback(() => {
    if (!config || !shop || !host) return;

    const url = new URL('/auth', config.appUrl);
    url.searchParams.set('shop', shop);
    url.searchParams.set('host', host);

    try {
      if (appBridge) {
        const redirect = Redirect.create(appBridge);
        redirect.dispatch(Redirect.Action.REMOTE, url.toString());
        return;
      }
    } catch {
      // fall through
    }

    try {
      if (window.top) {
        window.top.location.href = url.toString();
      } else {
        window.location.href = url.toString();
      }
    } catch {
      window.location.href = url.toString();
    }
  }, [config, shop, host, appBridge]);

  // Refresh shop info and domains
  const refresh = useCallback(async () => {
    if (!appFetch) return;
    
    setBusy(true);
    try {
      const shopData = await apiJson<ShopInfo>('/api/shop');
      setShopInfo(shopData);
      
      const domainsData = await apiJson<{ domains: DomainListItem[] }>('/api/domains');
      setDomains(domainsData.domains);
    } catch (e: unknown) {
      const statusCode = e && typeof e === 'object' && 'status' in e ? (e as { status: number }).status : undefined;
      if (statusCode === 401) {
        reauthenticate();
        return;
      }
      setToastMessage(e instanceof Error ? e.message : String(e));
      setToastError(true);
    } finally {
      setBusy(false);
    }
  }, [appFetch, apiJson, reauthenticate]);

  // Initial load
  useEffect(() => {
    if (!appBridge) return;
    refresh();
  }, [appBridge, refresh]);

  // Auto-refresh every 5 seconds
  useEffect(() => {
    if (!appBridge) return;
    const interval = setInterval(() => {
      refresh();
    }, 5000);
    return () => clearInterval(interval);
  }, [appBridge, refresh]);

  // Check for Domain Connect success on return
  useEffect(() => {
    const dcSuccess = getQueryParam('dc');
    if (dcSuccess === 'success') {
      setDomainConnectSuccess(true);
    }
  }, []);

  // Open Add Domain modal
  const openAddDomainModal = () => {
    setShowAddModal(true);
    setModalStep(1);
    setNewDomain('');
    setScanResult(null);
    setDnsManuallyConfigured(false);
    setDomainConnectSuccess(false);
  };

  // Close Add Domain modal
  const closeAddDomainModal = () => {
    setShowAddModal(false);
    setModalStep(1);
    setNewDomain('');
    setScanResult(null);
    setDnsManuallyConfigured(false);
    setDomainConnectSuccess(false);
  };

  // Validate domain format
  const isDomainValid = (domain: string): boolean => {
    const trimmed = domain.trim();
    if (!trimmed) return false;
    // Basic domain validation
    const domainRegex = /^[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,}$/i;
    return domainRegex.test(trimmed);
  };

  // Go to step 2
  const goToStep2 = async () => {
    if (!isDomainValid(newDomain)) return;
    
    setModalStep(2);
    
    // Scan domain for registrar info
    setScanningDomain(true);
    try {
      const result = await apiJson<DomainScanResult>('/api/domains/scan', {
        method: 'POST',
        body: JSON.stringify({ domain: newDomain.trim().toLowerCase() }),
      });
      setScanResult(result);
    } finally {
      setScanningDomain(false);
    }
  };

  // Submit new domain
  const submitDomain = async () => {
    if (!isDomainValid(newDomain)) return;
    
    setBusy(true);
    try {
      await apiJson<DomainListItem>('/api/domains/onboard', {
        method: 'POST',
        body: JSON.stringify({ domain: newDomain.trim().toLowerCase() }),
      });
      
      closeAddDomainModal();
      setToastMessage('Domain onboarding started!');
      setToastError(false);
      
      // Refresh immediately
      refresh();
    } catch (e: unknown) {
      setToastMessage(e instanceof Error ? e.message : String(e));
      setToastError(true);
    } finally {
      setBusy(false);
    }
  };

  // Open Domain Connect in new window
  const openDomainConnect = () => {
    if (scanResult?.domainConnectUrl) {
      window.open(scanResult.domainConnectUrl, '_blank');
    }
  };

  // View CNAME instructions
  const viewCNAME = (domain: string) => {
    setDetailsDomain(domain);
    fetchDomainDetails(domain);
  };

  // Fetch domain details
  const fetchDomainDetails = async (domain: string) => {
    try {
      const details = await apiJson<DomainDetails>(`/api/domains/${encodeURIComponent(domain)}/details`);
      setDomainDetails(details);
    } catch (e: unknown) {
      setToastMessage(e instanceof Error ? e.message : String(e));
      setToastError(true);
    }
  };

  // Retry onboarding for a domain
  const retryDomain = async (domain: string) => {
    setBusy(true);
    try {
      await apiJson<DomainListItem>('/api/domains/onboard', {
        method: 'POST',
        body: JSON.stringify({ domain }),
      });
      
      setToastMessage('Retry started for ' + domain);
      setToastError(false);
      
      // Refresh immediately
      refresh();
    } catch (e: unknown) {
      setToastMessage(e instanceof Error ? e.message : String(e));
      setToastError(true);
    } finally {
      setBusy(false);
    }
  };

  // Render loading state
  if (!shop || !host) {
    return (
      <Page title="Apple Pay Domain Portal">
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
      <Page title="Apple Pay Domain Portal">
        <Banner tone="critical" title="Failed to load app configuration">
          <p>{configError}</p>
        </Banner>
      </Page>
    );
  }

  if (!config || !appBridge) {
    return (
      <Page title="Apple Pay Domain Portal">
        <InlineStack gap="300" align="center" blockAlign="center">
          <Spinner size="small" />
          <Text as="p">Loading…</Text>
        </InlineStack>
      </Page>
    );
  }

  // Render main portal
  return (
    <Page
      title="Apple Pay Domain Portal"
      subtitle={shopInfo ? `${shopInfo.shopName} (${shopInfo.shop})` : shop}
      primaryAction={{
        content: 'Add Domain',
        onAction: openAddDomainModal,
      }}
    >
      <Layout>
        <Layout.Section>
          <Card padding="0">
            <IndexTable
              resourceName={{ singular: 'domain', plural: 'domains' }}
              itemCount={domains.length}
              headings={[
                { title: 'Domain' },
                { title: 'Status' },
                { title: 'Actions' },
              ]}
              selectable={false}
              loading={busy}
            >
              {domains.map((domain, index) => (
                <IndexTable.Row id={domain.domain} key={domain.domain} position={index}>
                  <IndexTable.Cell>
                    <Text as="span" fontWeight="semibold">
                      {domain.domain}
                    </Text>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <Badge tone={getStatusBadge(domain.status)}>
                      {getStatusLabel(domain.status)}
                    </Badge>
                  </IndexTable.Cell>
                  <IndexTable.Cell>
                    <InlineStack gap="200">
                      <Button size="slim" onClick={() => viewCNAME(domain.domain)}>
                        View CNAME
                      </Button>
                      <Button size="slim" onClick={() => viewCNAME(domain.domain)}>
                        Details
                      </Button>
                      {domain.status === 'ERROR' && (
                        <Button size="slim" variant="primary" onClick={() => retryDomain(domain.domain)}>
                          Retry
                        </Button>
                      )}
                    </InlineStack>
                  </IndexTable.Cell>
                </IndexTable.Row>
              ))}
            </IndexTable>
            
            {domains.length === 0 && !busy && (
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <BlockStack gap="400" align="center">
                  <Text as="p" tone="subdued">
                    No domains configured yet.
                  </Text>
                  <Button variant="primary" onClick={openAddDomainModal}>
                    Add Your First Domain
                  </Button>
                </BlockStack>
              </div>
            )}
          </Card>
        </Layout.Section>
      </Layout>

      {/* Add Domain Modal */}
      <Modal
        open={showAddModal}
        onClose={closeAddDomainModal}
        title={modalStep === 1 ? 'Add Domain - Step 1' : 'Add Domain - Step 2: DNS Configuration'}
        primaryAction={
          modalStep === 1
            ? {
                content: 'Next',
                onAction: goToStep2,
                disabled: !isDomainValid(newDomain),
              }
            : {
                content: 'Submit',
                onAction: submitDomain,
                disabled: !dnsManuallyConfigured && !domainConnectSuccess,
                loading: busy,
              }
        }
        secondaryActions={[
          {
            content: modalStep === 1 ? 'Cancel' : 'Back',
            onAction: modalStep === 1 ? closeAddDomainModal : () => setModalStep(1),
          },
        ]}
      >
        <Modal.Section>
          {modalStep === 1 ? (
            <BlockStack gap="400">
              <TextField
                label="Domain"
                value={newDomain}
                onChange={setNewDomain}
                placeholder="example.com"
                autoComplete="off"
              />
              
              {shopInfo?.primaryDomain && (
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">
                    Suggested domains:
                  </Text>
                  <InlineStack gap="200">
                    <Button
                      size="slim"
                      onClick={() => setNewDomain(shopInfo.primaryDomain || '')}
                    >
                      {shopInfo.primaryDomain}
                    </Button>
                  </InlineStack>
                </BlockStack>
              )}
            </BlockStack>
          ) : (
            <BlockStack gap="400">
              <Card>
                <BlockStack gap="300">
                  <Text as="h3" variant="headingSm">
                    Manual DNS Configuration
                  </Text>
                  <Text as="p">
                    Add this CNAME record to your DNS provider:
                  </Text>
                  <InlineGrid columns={2} gap="200">
                    <Text as="p" fontWeight="semibold">Type:</Text>
                    <Text as="p">CNAME</Text>
                    <Text as="p" fontWeight="semibold">Host:</Text>
                    <Text as="p">{newDomain}</Text>
                    <Text as="p" fontWeight="semibold">Target:</Text>
                    <Text as="p" breakWord>
                      {config?.appUrl ? new URL(config.appUrl).hostname : '(loading...)'}
                    </Text>
                  </InlineGrid>
                  <Text as="p" tone="subdued">
                    If your DNS provider does not allow CNAME at the apex (root), use an ALIAS/ANAME record
                    (or CNAME flattening if using Cloudflare DNS).
                  </Text>
                  
                  <Checkbox
                    label="I have added the CNAME record"
                    checked={dnsManuallyConfigured}
                    onChange={setDnsManuallyConfigured}
                  />
                </BlockStack>
              </Card>

              <Divider />

              <Card>
                <BlockStack gap="300">
                  <Text as="h3" variant="headingSm">
                    Automatic 1-Click (Domain Connect)
                  </Text>
                  
                  {scanningDomain ? (
                    <InlineStack gap="200">
                      <Spinner size="small" />
                      <Text as="p">Scanning domain...</Text>
                    </InlineStack>
                  ) : scanResult?.supported && scanResult?.domainConnectUrl ? (
                    <BlockStack gap="300">
                      <Text as="p" tone="success">
                        ✓ Your registrar supports Domain Connect!
                      </Text>
                      <Button variant="primary" onClick={openDomainConnect}>
                        Connect DNS Automatically
                      </Button>
                      {domainConnectSuccess && (
                        <Text as="p" tone="success">
                          ✓ Domain Connect completed successfully!
                        </Text>
                      )}
                    </BlockStack>
                  ) : (
                    <Text as="p" tone="subdued">
                      Domain Connect is not available for this domain. Please use manual DNS configuration.
                    </Text>
                  )}
                </BlockStack>
              </Card>
            </BlockStack>
          )}
        </Modal.Section>
      </Modal>

      {/* Domain Details Modal */}
      <Modal
        open={detailsDomain !== null}
        onClose={() => {
          setDetailsDomain(null);
          setDomainDetails(null);
        }}
        title={`Domain Details: ${detailsDomain}`}
        primaryAction={{
          content: 'Close',
          onAction: () => {
            setDetailsDomain(null);
            setDomainDetails(null);
          },
        }}
      >
        <Modal.Section>
          {!domainDetails ? (
            <InlineStack gap="200">
              <Spinner size="small" />
              <Text as="p">Loading details...</Text>
            </InlineStack>
          ) : (
            <BlockStack gap="400">
              <InlineGrid columns={2} gap="200">
                <Text as="p" fontWeight="semibold">Domain:</Text>
                <Text as="p">{domainDetails.domain}</Text>
                
                <Text as="p" fontWeight="semibold">Status:</Text>
                <Badge tone={getStatusBadge(domainDetails.status)}>
                  {getStatusLabel(domainDetails.status)}
                </Badge>
                
                {domainDetails.lastError && (
                  <>
                    <Text as="p" fontWeight="semibold">Last Error:</Text>
                    <Text as="p" tone="critical">{domainDetails.lastError}</Text>
                  </>
                )}
                
                <Text as="p" fontWeight="semibold">Last Checked:</Text>
                <Text as="p">{domainDetails.lastCheckedAt || 'Never'}</Text>
                
                {domainDetails.appleMerchantId && (
                  <>
                    <Text as="p" fontWeight="semibold">Apple Merchant ID:</Text>
                    <Text as="p" breakWord>{domainDetails.appleMerchantId}</Text>
                  </>
                )}
                
                {domainDetails.cloudflareHostnameId && (
                  <>
                    <Text as="p" fontWeight="semibold">Cloudflare Hostname ID:</Text>
                    <Text as="p" breakWord>{domainDetails.cloudflareHostnameId}</Text>
                  </>
                )}
                
                {domainDetails.cloudflareHostnameStatus && (
                  <>
                    <Text as="p" fontWeight="semibold">Cloudflare Status:</Text>
                    <Text as="p">{domainDetails.cloudflareHostnameStatus}</Text>
                  </>
                )}
                
                {domainDetails.cloudflareSslStatus && (
                  <>
                    <Text as="p" fontWeight="semibold">SSL Status:</Text>
                    <Text as="p">{domainDetails.cloudflareSslStatus}</Text>
                  </>
                )}
              </InlineGrid>

              <Divider />

              <Card>
                <BlockStack gap="300">
                  <Text as="h3" variant="headingSm">
                    CNAME Configuration
                  </Text>
                  <InlineGrid columns={2} gap="200">
                    <Text as="p" fontWeight="semibold">Type:</Text>
                    <Text as="p">{domainDetails.dnsInstructions.recordType}</Text>
                    <Text as="p" fontWeight="semibold">Host:</Text>
                    <Text as="p" breakWord>{domainDetails.dnsInstructions.host}</Text>
                    <Text as="p" fontWeight="semibold">Target:</Text>
                    <Text as="p" breakWord>{domainDetails.dnsInstructions.value}</Text>
                  </InlineGrid>
                  {domainDetails.dnsInstructions.note && (
                    <Text as="p" tone="subdued">
                      {domainDetails.dnsInstructions.note}
                    </Text>
                  )}
                </BlockStack>
              </Card>
            </BlockStack>
          )}
        </Modal.Section>
      </Modal>

      {/* Toast */}
      {toastMessage && (
        <Toast
          content={toastMessage}
          onDismiss={() => setToastMessage(null)}
          error={toastError}
        />
      )}
    </Page>
  );
}
