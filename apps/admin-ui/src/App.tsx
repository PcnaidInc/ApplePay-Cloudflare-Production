// FILE: apps/admin-ui/src/App.tsx
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { apiJson, ApiError } from './api/client';
import {
  Badge,
  Banner,
  BlockStack,
  Box,
  Button,
  Card,
  Checkbox,
  DataTable,
  Divider,
  InlineStack,
  Layout,
  Modal,
  Page,
  Tabs,
  Text,
  TextField,
} from '@shopify/polaris';

type Config = {
  shopifyApiKey: string;
  appUrl: string;
  cnameTarget: string;
};

type ShopInfo = {
  shop: string;
  shopId: string;
  shopName: string;
  primaryDomain: string | null;
};

type DnsInstructions = {
  recordType: 'CNAME' | 'ALIAS' | 'ANAME';
  host: string;
  value: string;
  note?: string;
};

type ApplePayDomain = {
  domain: string | null;
  status: string;
  lastError: string | null;
  cloudflareHostnameStatus: string | null;
  cloudflareSslStatus: string | null;
  appleLastCheckedAt: string | null;
  appleMerchantId: string | null;
  dnsInstructions: DnsInstructions | null;

  // extra fields from /api/applepay/domains (optional)
  createdAt?: string | null;
  updatedAt?: string | null;
  cloudflareHostnameId?: string | null;
};

type DomainsResponse = {
  ok: true;
  domains: ApplePayDomain[];
};

type ApiErrorBody = { error: string; details?: unknown };

function getQueryParam(name: string): string | null {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function coerceHostname(input: string): string {
  const raw = String(input || '').trim();
  if (!raw) return '';
  try {
    const u = raw.includes('://') ? new URL(raw) : new URL(`https://${raw}`);
    return (u.hostname || '').trim().toLowerCase();
  } catch {
    return (raw.split(/[/?#]/)[0] || '').trim().toLowerCase();
  }
}

type Bucket = 'all' | 'pending' | 'inProcess' | 'error' | 'completed';

function bucketForStatus(status: string): Bucket {
  switch (status) {
    case 'VERIFIED':
      return 'completed';
    case 'PENDING':
      return 'inProcess';
    case 'DNS_NOT_CONFIGURED':
    case 'NOT_STARTED':
      return 'pending';
    case 'ERROR':
      return 'error';
    default:
      return 'pending';
  }
}

function labelForStatus(status: string): string {
  switch (status) {
    case 'VERIFIED':
      return 'Registered';
    case 'PENDING':
      return 'In process';
    case 'DNS_NOT_CONFIGURED':
      return 'Pending DNS';
    case 'ERROR':
      return 'Error';
    case 'UNREGISTERED':
      return 'Disabled';
    default:
      return status;
  }
}

function toneForStatus(status: string): 'success' | 'info' | 'attention' | 'critical' | undefined {
  switch (status) {
    case 'VERIFIED':
      return 'success';
    case 'PENDING':
      return 'info';
    case 'DNS_NOT_CONFIGURED':
      return 'attention';
    case 'ERROR':
      return 'critical';
    case 'UNREGISTERED':
      return undefined;
    default:
      return 'attention';
  }
}

// Smart polling tuning
const POLL_FAST_MS = 5_000; // 5s when “busy”
const POLL_IDLE_MS = 12 * 60 * 60 * 1000; // 12h when “idle”
const POLL_MAX_BACKOFF_MS = 60_000; // cap backoff at 60s

function AppContent({ config }: { config: Config }) {
  const [shopInfo, setShopInfo] = useState<ShopInfo | null>(null);
  const [domains, setDomains] = useState<ApplePayDomain[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const [infoBanner, setInfoBanner] = useState<string | null>(null);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState(0);

  // Add Domain modal state
  const [addOpen, setAddOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [domainInput, setDomainInput] = useState('');
  const [manualConfirmed, setManualConfirmed] = useState(false);
  const [domainConnectConfirmed, setDomainConnectConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);

  // Auto-retry (only for domains submitted during this session)
  const autoRetryDomains = useRef<Set<string>>(new Set());
  const retryState = useRef<Record<string, { inFlight: boolean; lastAttemptMs: number }>>({});

    // Polling/backoff state (persists across renders)
  const failureCount = useRef(0);
  const pollTimeoutId = useRef<number | null>(null);

  const refreshShopInfo = useCallback(async () => {
    const info = await apiJson<ShopInfo>('/api/shop');
    setShopInfo(info);
  }, []);

  // IMPORTANT: this now RETURNS the latest list so polling can make decisions immediately
  const refreshDomains = useCallback(async (): Promise<ApplePayDomain[]> => {
    const res = await apiJson<DomainsResponse>('/api/applepay/domains');
    const next = res.domains || [];

    setDomains(next);

    // keep selection valid without needing selectedDomain in deps
    setSelectedDomain((prev) => {
      if (!prev) return prev;
      return next.some((d) => d.domain === prev) ? prev : null;
    });

    return next;
  }, []);

  const onboardDomain = useCallback(
    async (domain: string, { silent = false }: { silent?: boolean } = {}) => {
      const normalized = coerceHostname(domain);
      if (!normalized) return;

      try {
        if (!silent) setBusy(true);

        const updated = await apiJson<ApplePayDomain>('/api/applepay/onboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ domain: normalized }),
        });

        setDomains((prev) => {
          const next = [...prev];
          const idx = next.findIndex((d) => d.domain === updated.domain);
          if (idx >= 0) next[idx] = { ...next[idx], ...updated };
          else next.unshift(updated);
          return next;
        });

        if (!silent) setInfoBanner(`Onboarding started for ${normalized}`);
        setErrorBanner(null);

        // enable auto-retry for this domain
        autoRetryDomains.current.add(normalized);
      } catch (e: unknown) {
        if (!silent) setErrorBanner(e instanceof Error ? e.message : String(e));
      } finally {
        if (!silent) setBusy(false);
      }
    },
    [],
  );

   // When app bridge becomes ready, load shop + domains
  useEffect(() => {
    (async () => {
      try {
        await refreshShopInfo();
        await refreshDomains();
      } catch (e: unknown) {
        setErrorBanner(e instanceof Error ? e.message : String(e));
      }
    })();
  }, [refreshShopInfo, refreshDomains]);


    // Smart polling:
  // - 5s when any domain is active (waiting on Apple/DNS/etc.) OR when session-submitted domains are retrying
  // - 12h when idle (0 domains or all VERIFIED/UNREGISTERED)
  // - exponential backoff up to 60s when the backend is failing
  useEffect(() => {
    let cancelled = false;

    const clearTimer = () => {
      if (pollTimeoutId.current != null) {
        window.clearTimeout(pollTimeoutId.current);
        pollTimeoutId.current = null;
      }
    };

    const isTerminal = (status: string) => status === 'VERIFIED' || status === 'UNREGISTERED';
    const isActive = (status: string) => !isTerminal(status);

    const poll = async () => {
      if (cancelled) return;

      let nextDelay = POLL_IDLE_MS; // default idle

      try {
        // refreshDomains() returns the latest list now (important!)
        const latestDomains = await refreshDomains();

        // Success → reset backoff
        failureCount.current = 0;

        // “Neediest domain” logic: if ANY domain is active, stay in fast mode.
        const hasActiveServerDomains = latestDomains.some((d) => isActive(d.status));

        // If ANY session-submitted domain is still active (or hasn't appeared yet), stay in fast mode.
        let hasPendingRetries = false;
        for (const domainName of autoRetryDomains.current) {
          const d = latestDomains.find((x) => x.domain === domainName);
          if (!d || isActive(d.status)) {
            hasPendingRetries = true;
            break;
          }
        }

        nextDelay = hasActiveServerDomains || hasPendingRetries ? POLL_FAST_MS : POLL_IDLE_MS;

        // Auto-retry only while busy
        if (nextDelay === POLL_FAST_MS) {
          const now = Date.now();

          for (const domainName of autoRetryDomains.current) {
            const state = retryState.current[domainName] || { inFlight: false, lastAttemptMs: 0 };
            if (state.inFlight) continue;
            if (now - state.lastAttemptMs < POLL_FAST_MS) continue;

            const current = latestDomains.find((x) => x.domain === domainName);
            if (current && isTerminal(current.status)) continue; // done → stop retrying this one

            retryState.current[domainName] = { inFlight: true, lastAttemptMs: now };

            onboardDomain(domainName, { silent: true })
              .catch(() => {
                // quiet: keep polling loop alive
              })
              .finally(() => {
                retryState.current[domainName] = {
                  ...retryState.current[domainName],
                  inFlight: false,
                };
              });
          }
        }
      } catch {
        // Failure → exponential backoff up to 60s
        failureCount.current += 1;
        nextDelay = Math.min(POLL_FAST_MS * 2 ** failureCount.current, POLL_MAX_BACKOFF_MS);
      } finally {
        if (!cancelled) {
          clearTimer();
          pollTimeoutId.current = window.setTimeout(() => void poll(), nextDelay);
        }
      }
    };

    void poll();

    return () => {
      cancelled = true;
      clearTimer();
    };
  }, [refreshDomains, onboardDomain]);

  const selected = useMemo(() => {
    if (!selectedDomain) return null;
    return domains.find((d) => d.domain === selectedDomain) || null;
  }, [domains, selectedDomain]);

  const counts = useMemo(() => {
    const c = { all: domains.length, pending: 0, inProcess: 0, error: 0, completed: 0 };
    for (const d of domains) {
      const b = bucketForStatus(d.status);
      if (b === 'pending') c.pending += 1;
      if (b === 'inProcess') c.inProcess += 1;
      if (b === 'error') c.error += 1;
      if (b === 'completed') c.completed += 1;
    }
    return c;
  }, [domains]);

  const tabs = useMemo(
    () => [
      { id: 'all', content: `All (${counts.all})`, panelID: 'all-panel' },
      { id: 'pending', content: `Pending (${counts.pending})`, panelID: 'pending-panel' },
      { id: 'inProcess', content: `In process (${counts.inProcess})`, panelID: 'inProcess-panel' },
      { id: 'error', content: `Errors (${counts.error})`, panelID: 'error-panel' },
      { id: 'completed', content: `Completed (${counts.completed})`, panelID: 'completed-panel' },
    ],
    [counts],
  );

  const activeBucket: Bucket = useMemo(() => {
    switch (activeTab) {
      case 1:
        return 'pending';
      case 2:
        return 'inProcess';
      case 3:
        return 'error';
      case 4:
        return 'completed';
      default:
        return 'all';
    }
  }, [activeTab]);

  const filteredDomains = useMemo(() => {
    if (activeBucket === 'all') return domains;
    return domains.filter((d) => bucketForStatus(d.status) === activeBucket);
  }, [activeBucket, domains]);

  const dnsPreview: DnsInstructions | null = useMemo(() => {
    if (!config) return null;
    const d = coerceHostname(domainInput);
    if (!d) return null;
    return {
      recordType: 'CNAME',
      host: d,
      value: config.cnameTarget,
      note: 'Create this record with your DNS provider (registrar). DNS propagation may take a few minutes.',
    };
  }, [config, domainInput]);

  function resetModal() {
    setStep(1);
    setDomainInput('');
    setManualConfirmed(false);
    setDomainConnectConfirmed(false);
    setInfoBanner(null);
    setErrorBanner(null);
  }

  const isDomainValid = !!coerceHostname(domainInput);

  const submitEnabled = domainConnectConfirmed || manualConfirmed;

  const tableRows = filteredDomains.map((d) => {
    const domain = d.domain || '';
    return [
      <Button
        key={`sel-${domain}`}
        variant="plain"
        onClick={() => setSelectedDomain(domain)}
        disabled={!domain}
      >
        {domain || '—'}
      </Button>,
      <Button
        key={`cname-${domain}`}
        variant="plain"
        onClick={() => setSelectedDomain(domain)}
        disabled={!domain}
      >
        View
      </Button>,
      <Badge key={`badge-${domain}`} tone={toneForStatus(d.status)}>
        {labelForStatus(d.status)}
      </Badge>,
      <Button
        key={`details-${domain}`}
        variant="plain"
        onClick={() => setSelectedDomain(domain)}
        disabled={!domain}
      >
        Details
      </Button>,
    ];
  });

  return (
    <Page
      title="Apple Pay Domains"
      subtitle={shopInfo?.shopName ? `Shop: ${shopInfo.shopName}` : undefined}
      primaryAction={{
        content: 'Add Domain',
        onAction: () => {
          resetModal();
          setAddOpen(true);
          // pre-fill with suggested domain if available
          if (shopInfo?.primaryDomain) setDomainInput(shopInfo.primaryDomain);
        },
      }}
    >
      <BlockStack gap="400">
        {infoBanner && (
          <Banner tone="success" onDismiss={() => setInfoBanner(null)}>
            {infoBanner}
          </Banner>
        )}
        {errorBanner && (
          <Banner tone="critical" onDismiss={() => setErrorBanner(null)}>
            {errorBanner}
          </Banner>
        )}

        <Layout>
          {/* CENTER: domains table */}
          <Layout.Section>
            <Card roundedAbove="sm">
              <Tabs tabs={tabs} selected={activeTab} onSelect={setActiveTab}>
                <Box padding="400">
                  <BlockStack gap="300">
                    <Text as="p" tone="subdued">
                      Domains are auto-refreshed every 5 seconds.
                    </Text>

                    <DataTable
                      columnContentTypes={['text', 'text', 'text', 'text']}
                      headings={['Domain', 'CNAME', 'Status', 'Details']}
                      rows={tableRows}
                    />

                    {filteredDomains.length === 0 && (
                      <Text as="p" tone="subdued">
                        No domains in this view.
                      </Text>
                    )}
                  </BlockStack>
                </Box>
              </Tabs>
            </Card>
          </Layout.Section>

          {/* RIGHT: details sidebar */}
          <Layout.Section variant="oneThird">
            <Card roundedAbove="sm">
              <Box padding="400">
                <BlockStack gap="300">
                  <Text as="h2" variant="headingMd">
                    Domain details
                  </Text>

                  {!selected ? (
                    <Text as="p" tone="subdued">
                      Select a domain from the table to view the CNAME and status details.
                    </Text>
                  ) : (
                    <>
                      <BlockStack gap="100">
                        <Text as="p" variant="bodyMd">
                          <strong>{selected.domain}</strong>
                        </Text>
                        <Text as="p" tone="subdued">
                          Status: {labelForStatus(selected.status)}
                        </Text>
                      </BlockStack>

                      <Divider />

                      <BlockStack gap="200">
                        <Text as="h3" variant="headingSm">
                          CNAME record
                        </Text>

                        {selected.dnsInstructions ? (
                          <Box padding="300" background="bg-surface-secondary" borderRadius="200">
                            <BlockStack gap="100">
                              <Text as="p" variant="bodySm">
                                <strong>Type:</strong> {selected.dnsInstructions.recordType}
                              </Text>
                              <Text as="p" variant="bodySm">
                                <strong>Host:</strong> {selected.dnsInstructions.host}
                              </Text>
                              <Text as="p" variant="bodySm">
                                <strong>Value:</strong> {selected.dnsInstructions.value}
                              </Text>
                              {selected.dnsInstructions.note && (
                                <Text as="p" tone="subdued" variant="bodySm">
                                  {selected.dnsInstructions.note}
                                </Text>
                              )}
                            </BlockStack>
                          </Box>
                        ) : (
                          <Text as="p" tone="subdued">
                            No DNS instructions available.
                          </Text>
                        )}
                      </BlockStack>

                      <Divider />

                      <BlockStack gap="200">
                        <Text as="h3" variant="headingSm">
                          System status
                        </Text>
                        <Text as="p" variant="bodySm">
                          <strong>Cloudflare hostname status:</strong>{' '}
                          {selected.cloudflareHostnameStatus || '—'}
                        </Text>
                        <Text as="p" variant="bodySm">
                          <strong>Cloudflare SSL status:</strong> {selected.cloudflareSslStatus || '—'}
                        </Text>
                        <Text as="p" variant="bodySm">
                          <strong>Last Apple check:</strong> {selected.appleLastCheckedAt || '—'}
                        </Text>

                        {selected.lastError && (
                          <Banner tone="critical" title="Last error">
                            <Text as="p" variant="bodySm">
                              {selected.lastError}
                            </Text>
                          </Banner>
                        )}
                      </BlockStack>

                      <InlineStack gap="200">
                        <Button onClick={() => refreshDomains()} disabled={busy}>
                          Refresh now
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => onboardDomain(String(selected.domain))}
                          loading={busy}
                        >
                          Retry onboarding
                        </Button>
                      </InlineStack>
                    </>
                  )}
                </BlockStack>
              </Box>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>

      {/* Add Domain Modal */}
      <Modal
        open={addOpen}
        onClose={() => {
          setAddOpen(false);
          resetModal();
        }}
        title={step === 1 ? 'Add a domain' : 'Connect your DNS'}
        primaryAction={
          step === 1
            ? {
                content: 'Next',
                onAction: () => setStep(2),
                disabled: !isDomainValid,
              }
            : {
                content: 'Submit',
                onAction: async () => {
                  const d = coerceHostname(domainInput);
                  if (!d) return;
                  await onboardDomain(d);
                  setAddOpen(false);
                  resetModal();
                  await refreshDomains();
                  setSelectedDomain(d);
                },
                disabled: !submitEnabled,
                loading: busy,
              }
        }
        secondaryActions={
          step === 1
            ? [
                {
                  content: 'Cancel',
                  onAction: () => {
                    setAddOpen(false);
                    resetModal();
                  },
                },
              ]
            : [
                {
                  content: 'Back',
                  onAction: () => {
                    setStep(1);
                    setManualConfirmed(false);
                    setDomainConnectConfirmed(false);
                  },
                },
                {
                  content: 'Cancel',
                  onAction: () => {
                    setAddOpen(false);
                    resetModal();
                  },
                },
              ]
        }
      >
        <Modal.Section>
          {step === 1 ? (
            <BlockStack gap="300">
              <TextField
                label="Domain"
                value={domainInput}
                onChange={setDomainInput}
                autoComplete="off"
                helpText="Enter the exact hostname you want to enable Apple Pay for (e.g. dev.example.com)."
              />

              {shopInfo?.primaryDomain && (
                <Box>
                  <Text as="p" tone="subdued">
                    Suggested:
                  </Text>
                  <Button
                    variant="plain"
                    onClick={() => setDomainInput(shopInfo.primaryDomain || '')}
                  >
                    Use {shopInfo.primaryDomain}
                  </Button>
                </Box>
              )}
            </BlockStack>
          ) : (
            <BlockStack gap="300">
              <Text as="p" tone="subdued">
                Add this DNS record at your registrar/DNS provider. Then confirm below.
              </Text>

              {dnsPreview ? (
                <Box padding="300" background="bg-surface-secondary" borderRadius="200">
                  <BlockStack gap="100">
                    <Text as="p" variant="bodySm">
                      <strong>Type:</strong> {dnsPreview.recordType}
                    </Text>
                    <Text as="p" variant="bodySm">
                      <strong>Host:</strong> {dnsPreview.host}
                    </Text>
                    <Text as="p" variant="bodySm">
                      <strong>Value:</strong> {dnsPreview.value}
                    </Text>
                    {dnsPreview.note && (
                      <Text as="p" tone="subdued" variant="bodySm">
                        {dnsPreview.note}
                      </Text>
                    )}
                  </BlockStack>
                </Box>
              ) : (
                <Banner tone="critical">Missing DNS instructions (check config / domain).</Banner>
              )}

              <Divider />

              <BlockStack gap="200">
                <Text as="h3" variant="headingSm">
                  Automatic 1‑click (Domain Connect)
                </Text>
                <Text as="p" tone="subdued">
                  Coming next: we’ll detect your registrar and show the correct 1‑click setup button.
                </Text>

                <Button disabled>Connect automatically</Button>

                {/* In the future: when redirected back from Domain Connect, setDomainConnectConfirmed(true) */}
              </BlockStack>

              <Divider />

              <Checkbox
                label="I added the CNAME record manually"
                checked={manualConfirmed}
                onChange={setManualConfirmed}
              />

              <Text as="p" tone="subdued">
                Submit stays disabled until you either complete the 1‑click flow or confirm manual DNS.
              </Text>
            </BlockStack>
          )}
        </Modal.Section>
      </Modal>
    </Page>
  );
}

export default function App() {
  const shop = getQueryParam('shop');
  const host = getQueryParam('host');

  const [config, setConfig] = useState<Config | null>(null);
  const [configError, setConfigError] = useState<string | null>(null);

  async function loadConfig() {
    try {
      const res = await fetch('/api/config', { headers: { Accept: 'application/json' } });
      const json = (await res.json()) as Config | ApiErrorBody;
      if (!res.ok) {
        const error = json as ApiErrorBody;
        throw new Error(error?.error || `Failed to load config (${res.status})`);
      }
      setConfig(json as Config);
    } catch (e: unknown) {
      setConfigError(e instanceof Error ? e.message : String(e));
    }
  }

  useEffect(() => {
    loadConfig();
  }, []);

  if (!shop || !host) {
    return (
      <Page title="Apple Pay Domains">
        <Banner tone="critical" title="Missing required parameters">
          This embedded app must be opened from Shopify Admin (missing <code>shop</code> or <code>host</code>).
        </Banner>
      </Page>
    );
  }

  if (configError) {
    return (
      <Page title="Apple Pay Domains">
        <Banner tone="critical" title="Failed to load app config">
          {configError}
        </Banner>
      </Page>
    );
  }

  if (!config) {
    return (
      <Page title="Apple Pay Domains">
        <Card>
          <Box padding="400">
            <Text as="p">Loading…</Text>
          </Box>
        </Card>
      </Page>
    );
  }

  // App Bridge v4 initializes automatically from the script tag and meta tags in index.html
  // No need for AppBridgeProvider or manual initialization
  return <AppContent config={config} />;
}

