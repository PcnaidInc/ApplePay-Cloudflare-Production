import { trace, SpanStatusCode } from '@opentelemetry/api';

export function nowIso(): string {
  return new Date().toISOString();
}

export function randomState(bytes: number = 16): string {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  return Array.from(buf)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const bytes = new Uint8Array(hash);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Wraps a promise in an OpenTelemetry span for error tracking.
 * Useful for tracing internal operations like Apple API calls or database transactions.
 */
export async function performOp<T>(
  name: string,
  operation: () => Promise<T>
): Promise<T> {
  const tracer = trace.getTracer('applepay-worker');
  return tracer.startActiveSpan(name, async (span) => {
    try {
      const result = await operation();
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (err: any) {
      // Capture the error in Datadog
      span.recordException(err);
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: err.message || String(err),
      });
      // Re-throw so the app handles it normally
      throw err;
    } finally {
      span.end();
    }
  });
}
