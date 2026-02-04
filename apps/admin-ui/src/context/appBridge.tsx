import { createContext, useContext, useMemo, type ReactNode } from "react";
import createApp, { type AppConfigV2, type ClientApplication } from "@shopify/app-bridge";

const AppBridgeContext = createContext<ClientApplication | null>(null);

interface AppBridgeProviderProps {
  config: AppConfigV2; // ✅ require V2
  children: ReactNode;
}

export function AppBridgeProvider({ config, children }: AppBridgeProviderProps) {
  const app = useMemo(() => createApp(config), [config]);
  return <AppBridgeContext.Provider value={app}>{children}</AppBridgeContext.Provider>;
}

export function useAppBridge(): ClientApplication {
  const app = useContext(AppBridgeContext);
  if (!app) throw new Error("AppBridgeProvider is missing from the component tree.");
  return app;
}
