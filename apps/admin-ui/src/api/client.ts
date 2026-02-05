/**
 * Unified API client for making authenticated requests to the backend.
 * 
 * App Bridge v4 automatically injects session tokens into fetch requests,
 * so we just need to handle errors and retries consistently.
 */

type ApiErrorBody = {
  error: string;
  details?: unknown;
};

export class ApiError extends Error {
  status: number;
  details?: unknown;
  
  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

/**
 * Make an authenticated API request.
 * App Bridge v4 automatically adds the session token to the Authorization header.
 * 
 * @param path - API path (e.g., '/api/shop')
 * @param options - Fetch options
 * @returns Response object
 */
export async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  // Resolve to absolute URL (same origin)
  const url = new URL(path, window.location.origin);
  
  // Set default headers
  const headers = new Headers(options.headers);
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }
  if (options.body && typeof options.body === 'string' && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  
  // Make the request - App Bridge v4 will auto-inject the session token
  const response = await fetch(url.toString(), {
    ...options,
    headers,
  });
  
  // If we get a 401 with the retry header, App Bridge v4 will automatically
  // refresh the token and retry the request. We don't need to handle it manually.
  // However, if we get a 401 without retry (e.g., app not installed), we should
  // let the error propagate.
  
  return response;
}

/**
 * Make an authenticated API request and parse JSON response.
 * 
 * @param path - API path (e.g., '/api/shop')
 * @param options - Fetch options
 * @returns Parsed JSON response
 * @throws ApiError if response is not ok
 */
export async function apiJson<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await apiFetch(path, options);
  
  const text = await response.text();
  const json = text ? JSON.parse(text) : null;
  
  if (!response.ok) {
    const body = json as ApiErrorBody | null;
    throw new ApiError(
      body?.error || `Request failed (${response.status})`,
      response.status,
      body?.details
    );
  }
  
  return json as T;
}

/**
 * Helper to make GET requests
 */
export function apiGet<T>(path: string): Promise<T> {
  return apiJson<T>(path, { method: 'GET' });
}

/**
 * Helper to make POST requests with JSON body
 */
export function apiPost<T>(path: string, body?: unknown): Promise<T> {
  return apiJson<T>(path, {
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * Helper to make PUT requests with JSON body
 */
export function apiPut<T>(path: string, body?: unknown): Promise<T> {
  return apiJson<T>(path, {
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * Helper to make DELETE requests
 */
export function apiDelete<T>(path: string): Promise<T> {
  return apiJson<T>(path, { method: 'DELETE' });
}
