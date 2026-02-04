// FILE: apps/admin-ui/src/context/appBridge.tsx
import { createContext, useContext, useMemo, type ReactNode } from 'react';
import createApp, { type ClientApplication } from '@shopify/app-bridge';

// This guarantees our config type always matches the installed @shopify/app-bridge version.
type AppBridgeConfig = Parameters<typeof createApp>[0];

const AppBridgeContext = createContext<ClientApplication | null>(null);

interface AppBridgeProviderProps {
  config: AppBridgeConfig;
  children: ReactNode;
}

export function AppBridgeProvider({ config, children }: AppBridgeProviderProps) {
  const app = useMemo(() => createApp(config), [config]);
  return <AppBridgeContext.Provider value={app}>{children}</AppBridgeContext.Provider>;
}

export function useAppBridge(): ClientApplication {
  const app = useContext(AppBridgeContext);
  if (!app) {
    throw new Error('AppBridgeProvider is missing from the component tree.');
  }
  return app;
}
