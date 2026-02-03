import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from '@shopify/polaris';
import { reactPlugin } from '@datadog/browser-rum-react';
import { datadogRum } from '@datadog/browser-rum';
import { datadogLogs } from '@datadog/browser-logs'; // <--- Import Datadog Logs SDK
import enTranslations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/build/esm/styles.css';

import App from './App';

// Initialize Datadog RUM with your specific credentials
datadogRum.init({
  applicationId: 'fcac6418-45db-4404-b44c-538e50ca6276',
  clientToken: 'pube132c1ae192e58bfe7a64b4fdf45e712',
  site: 'us5.datadoghq.com',
  service: 'applepay-admin-ui',
  env: 'production',
  version: '1.0.0',
  allowedTracingUrls: [
    "https://pcnaid.com",
    "https://pcnaid-edge.com",
    "https://pndsvcs.com",
    "https://dev.pndsvcs.com",
    "https://shops.myshopify.com",
    "https://app-dev-store-v1.myshopify.com",
    "https://applepay-control-plane.pcnaid.workers.dev",
    "https://fallback.pcnaid-edge.com",
    (url) => url.startsWith("https://dev.pndsvcs.com"),
    (url) => url.startsWith("https://pcnaid-edge.com"),    
    (url) => url.startsWith("https://pcnaid.com"),  
    (url) => url.startsWith("https://pndsvcs.com"),  
    (url) => url.startsWith("https://shops.myshopify.com"),  
    (url) => url.startsWith("https://app-dev-store-v1.myshopify.com"),  
    (url) => url.startsWith("https://applepay-control-plane.pcnaid.workers.dev"), 
    (url) => url.startsWith("https://fallback.pcnaid-edge.com")
    ],
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100,
  traceSampleRate: 20,
  defaultPrivacyLevel: 'mask-user-input',
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  usePartitionedCrossSiteSessionCookie: true,
  trackSessionAcrossSubdomains: false,
  plugins: [reactPlugin()]
});

datadogRum.startSessionReplayRecording();

// Initialize Datadog Browser Logs for console/network breadcrumbs
datadogLogs.init({
  clientToken: 'pube132c1ae192e58bfe7a64b4fdf45e712', // Same token as RUM
  site: 'us5.datadoghq.com',
  service: 'applepay-admin-ui',
  env: 'production',
  version: '1.0.0',
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,

  // Optional: drop noisy logs or scrub sensitive data
  beforeSend: (log) => {
    // Example: redact tokens if they ever appear in messages
    if (typeof log.message === 'string' && log.message.includes('id_token')) {
      return false;
    }
    // Redact any Shopify session tokens from logs
    if (typeof log.message === 'string' && log.message.includes('Bearer ')) {
      return false;
    }
    return true;
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider i18n={enTranslations}>
      <App />
    </AppProvider>
  </React.StrictMode>
);
