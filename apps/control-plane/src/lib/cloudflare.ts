export type CfCustomHostname = {
  id: string;
  hostname: string;
  status: string;
  custom_origin_server?: string;
  custom_origin_sni?: string;
  ssl?: {
    status?: string;
    method?: string;
    type?: string;
    validation_errors?: any[];
    validation_records?: any[];
  };
};

type CfApiResponse<T> = {
  success: boolean;
  errors: Array<{ code: number; message: string }>;
  messages: any[];
  result: T;
  result_info?: any;
};

export async function cfApiFetch<T>(args: {
  apiToken: string;
  path: string;
  init?: RequestInit;
}): Promise<T> {
  const res = await fetch(`https://api.cloudflare.com/client/v4${args.path}`, {
    ...args.init,
    headers: {
      ...(args.init?.headers ?? {}),
      'Authorization': `Bearer ${args.apiToken}`,
      'Content-Type': 'application/json',
    },
  });
  const json = (await res.json()) as CfApiResponse<T>;
  if (!res.ok || !json.success) {
    throw new Error(`Cloudflare API error (${res.status}): ${JSON.stringify(json.errors || json)}`);
  }
  return json.result;
}

export async function findCustomHostname(args: { apiToken: string; zoneId: string; hostname: string }): Promise<CfCustomHostname | null> {
  const result = await cfApiFetch<CfCustomHostname[]>({
    apiToken: args.apiToken,
    path: `/zones/${args.zoneId}/custom_hostnames?hostname=${encodeURIComponent(args.hostname)}`,
  });
  return result?.[0] ?? null;
}

export async function createCustomHostname(args: {
  apiToken: string;
  zoneId: string;
  hostname: string;
  customMetadata?: Record<string, string>;
  customOriginServer?: string;
  customOriginSni?: string;
}): Promise<CfCustomHostname> {
  return cfApiFetch<CfCustomHostname>({
    apiToken: args.apiToken,
    path: `/zones/${args.zoneId}/custom_hostnames`,
    init: {
      method: 'POST',
      body: JSON.stringify({
        hostname: args.hostname,
        // If provided, Cloudflare will connect to this origin (SNI = customOriginSni)
        // while preserving the merchant's Host header.
        custom_origin_server: args.customOriginServer ?? undefined,
        custom_origin_sni: args.customOriginSni ?? undefined,
        ssl: {
          method: 'http',
          type: 'dv',
          settings: {
            min_tls_version: '1.2',
            tls_1_3: 'on',
            http2: 'on'
          },
        },
      }),
    },
  });
}

export async function editCustomHostname(args: {
  apiToken: string;
  zoneId: string;
  customHostnameId: string;
  customOriginServer?: string;
  customOriginSni?: string;
  customMetadata?: Record<string, string>;
}): Promise<CfCustomHostname> {
  return cfApiFetch<CfCustomHostname>({
    apiToken: args.apiToken,
    path: `/zones/${args.zoneId}/custom_hostnames/${args.customHostnameId}`,
    init: {
      method: 'PATCH',
      body: JSON.stringify({
        custom_origin_server: args.customOriginServer ?? undefined,
        custom_origin_sni: args.customOriginSni ?? undefined,
      }),
    },
  });
}

export async function deleteCustomHostname(args: { apiToken: string; zoneId: string; customHostnameId: string }): Promise<void> {
  await cfApiFetch<any>({
    apiToken: args.apiToken,
    path: `/zones/${args.zoneId}/custom_hostnames/${args.customHostnameId}`,
    init: { method: 'DELETE' },
  });
}
