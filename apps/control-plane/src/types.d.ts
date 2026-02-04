// apps/control-plane/src/types.d.ts
import { Env } from '../worker-configuration';

declare module './worker-configuration' {
  interface Env {
    // Re-add the secret that wrangler types keeps deleting
    OTEL_EXPORTER_OTLP_HEADERS?: string;
  }
}