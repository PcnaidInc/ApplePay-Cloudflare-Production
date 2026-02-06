// ORDS (Oracle REST Data Services) client for Cloudflare Workers
// Provides SQL execution via ORDS REST-Enabled SQL Service

/**
 * ORDS configuration from environment variables
 */
export interface OrdsConfig {
  baseUrl: string;
  schemaAlias: string;
  username: string;
  password: string;
  authMode?: 'basic' | 'oauth';
}

/**
 * ORDS SQL request payload
 */
interface OrdsSqlRequest {
  statementText: string;
  binds?: Record<string, any>;
  offset?: number;
  limit?: number;
}

/**
 * ORDS SQL response structure
 */
interface OrdsSqlResponse {
  items?: Array<Record<string, any>>;
  hasMore?: boolean;
  limit?: number;
  offset?: number;
  count?: number;
  links?: Array<{ rel: string; href: string }>;
  // Error fields
  code?: string;
  message?: string;
  type?: string;
  instance?: string;
  // Metadata
  env?: {
    defaultTimeZone?: string;
  };
}

/**
 * Normalized error with correlation IDs
 */
export class OrdsError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly ordsCode?: string,
    public readonly correlationId?: string
  ) {
    super(message);
    this.name = 'OrdsError';
  }
}

/**
 * ORDS client for executing SQL via REST
 */
export class OrdsClient {
  private readonly config: OrdsConfig;
  private readonly timeout: number;

  constructor(config: OrdsConfig, timeout = 30000) {
    this.config = config;
    this.timeout = timeout;
  }

  /**
   * Execute a SQL statement via ORDS REST-Enabled SQL
   */
  private async executeSql(sql: string, binds?: Record<string, any>): Promise<OrdsSqlResponse> {
    const url = `${this.config.baseUrl}/ords/${this.config.schemaAlias}/_/sql`;
    
    const payload: OrdsSqlRequest = {
      statementText: sql,
    };

    if (binds && Object.keys(binds).length > 0) {
      payload.binds = binds;
    }

    // Build authorization header
    const authHeader = this.buildAuthHeader();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': authHeader,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const correlationId = response.headers.get('x-ords-request-id') || 
                           response.headers.get('x-request-id') ||
                           undefined;

      if (!response.ok) {
        let errorMessage = `ORDS request failed with status ${response.status}`;
        let ordsCode: string | undefined;

        try {
          const errorBody = await response.json() as OrdsSqlResponse;
          if (errorBody.message) {
            errorMessage = errorBody.message;
          }
          if (errorBody.code) {
            ordsCode = errorBody.code;
          }
        } catch {
          // Unable to parse error body, use status text
          errorMessage = `${errorMessage}: ${response.statusText}`;
        }

        throw new OrdsError(errorMessage, response.status, ordsCode, correlationId);
      }

      const data = await response.json() as OrdsSqlResponse;
      return data;

    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof OrdsError) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new OrdsError(`ORDS request timeout after ${this.timeout}ms`, 408);
      }

      throw new OrdsError(
        error instanceof Error ? error.message : 'Unknown ORDS error',
        500
      );
    }
  }

  /**
   * Build authorization header based on auth mode
   */
  private buildAuthHeader(): string {
    if (this.config.authMode === 'oauth') {
      // For OAuth, username/password are actually client_id/client_secret
      // This is a simplified implementation - production should cache tokens
      const credentials = btoa(`${this.config.username}:${this.config.password}`);
      return `Basic ${credentials}`;
    }

    // Basic auth (default)
    const credentials = btoa(`${this.config.username}:${this.config.password}`);
    return `Basic ${credentials}`;
  }

  /**
   * Normalize Oracle column names to snake_case
   * Oracle returns columns in uppercase by default
   */
  private normalizeColumnNames(row: Record<string, any>): Record<string, any> {
    const normalized: Record<string, any> = {};
    
    for (const [key, value] of Object.entries(row)) {
      // Convert to lowercase for snake_case convention
      const normalizedKey = key.toLowerCase();
      normalized[normalizedKey] = value;
    }

    return normalized;
  }

  /**
   * Convert ISO timestamp strings to Date objects where applicable
   */
  private parseDates(row: Record<string, any>): Record<string, any> {
    const parsed = { ...row };
    
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
        // Keep as ISO string for compatibility with existing code
        // The application expects ISO strings, not Date objects
        parsed[key] = value;
      }
    }

    return parsed;
  }

  /**
   * Query a single row
   * Returns null if no rows found
   */
  async queryOne<T = any>(sql: string, binds?: Record<string, any>): Promise<T | null> {
    const response = await this.executeSql(sql, binds);
    
    if (!response.items || response.items.length === 0) {
      return null;
    }

    const row = response.items[0];
    const normalized = this.normalizeColumnNames(row);
    const parsed = this.parseDates(normalized);
    
    return parsed as T;
  }

  /**
   * Query multiple rows
   * Returns empty array if no rows found
   */
  async queryMany<T = any>(sql: string, binds?: Record<string, any>): Promise<T[]> {
    const response = await this.executeSql(sql, binds);
    
    if (!response.items || response.items.length === 0) {
      return [];
    }

    return response.items.map(row => {
      const normalized = this.normalizeColumnNames(row);
      const parsed = this.parseDates(normalized);
      return parsed as T;
    });
  }

  /**
   * Execute DML (INSERT, UPDATE, DELETE, MERGE)
   * Returns number of rows affected
   */
  async execute(sql: string, binds?: Record<string, any>): Promise<number> {
    const response = await this.executeSql(sql, binds);
    
    // For DML, ORDS returns count of affected rows
    return response.count ?? 0;
  }
}

/**
 * Create an ORDS client from environment variables
 */
export function createOrdsClient(env: {
  ORDS_BASE_URL?: string;
  ORDS_SCHEMA_ALIAS?: string;
  ORDS_USERNAME?: string;
  ORDS_PASSWORD?: string;
  ORDS_AUTH_MODE?: 'basic' | 'oauth';
}): OrdsClient {
  const baseUrl = env.ORDS_BASE_URL;
  const schemaAlias = env.ORDS_SCHEMA_ALIAS;
  const username = env.ORDS_USERNAME;
  const password = env.ORDS_PASSWORD;

  if (!baseUrl || !schemaAlias || !username || !password) {
    throw new Error(
      'Missing required ORDS configuration. Please set: ORDS_BASE_URL, ORDS_SCHEMA_ALIAS, ORDS_USERNAME, ORDS_PASSWORD'
    );
  }

  return new OrdsClient({
    baseUrl,
    schemaAlias,
    username,
    password,
    authMode: env.ORDS_AUTH_MODE || 'basic',
  });
}
