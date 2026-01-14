import { base64UrlEncode, utf8ToBytes } from './base64url';

function stripPem(pem: string): string {
  return pem
    .replace(/-----BEGIN [^-]+-----/g, '')
    .replace(/-----END [^-]+-----/g, '')
    .replace(/\s+/g, '');
}

async function importRsaPrivateKey(pkcs8Pem: string): Promise<CryptoKey> {
  const b64 = stripPem(pkcs8Pem);
  const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  return crypto.subtle.importKey(
    'pkcs8',
    bytes.buffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
}

async function signRs256(privateKey: CryptoKey, data: Uint8Array): Promise<Uint8Array> {
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', privateKey, data);
  return new Uint8Array(sig);
}

export type AppleEnv = 'production' | 'sandbox';

export function appleBaseUrl(appleEnv: AppleEnv): string {
  return appleEnv === 'sandbox'
    ? 'https://apple-pay-gateway-cert.apple.com'
    : 'https://apple-pay-gateway.apple.com';
}

export async function createAppleAuthJwt(args: {
  appleEnv: AppleEnv;
  issuer: string;
  certificatePem: string;
  privateKeyPem: string;
}): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header: Record<string, any> = {
    alg: 'RS256',
    typ: 'JWT',
  };

  // Include x5c so the server can resolve the public key if needed.
  const certB64 = stripPem(args.certificatePem);
  if (certB64) header.x5c = [certB64];

  const payload = {
    iss: args.issuer,
    aud: appleBaseUrl(args.appleEnv),
    iat: now,
    exp: now + 30 * 60,
  };

  const encodedHeader = base64UrlEncode(utf8ToBytes(JSON.stringify(header)));
  const encodedPayload = base64UrlEncode(utf8ToBytes(JSON.stringify(payload)));
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  const key = await importRsaPrivateKey(args.privateKeyPem);
  const sig = await signRs256(key, utf8ToBytes(signingInput));
  const encodedSig = base64UrlEncode(sig);
  return `${signingInput}.${encodedSig}`;
}

type AppleFetcher = { fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response> };

export async function appleApiFetch(args: {
  fetcher: AppleFetcher;
  appleEnv: AppleEnv;
  pathOrUrl: string;
  init: RequestInit;
  useJwt: boolean;
  issuer: string;
  certificatePem: string;
  privateKeyPem: string;
}): Promise<Response> {
  const url = args.pathOrUrl.startsWith('http')
    ? args.pathOrUrl
    : `${appleBaseUrl(args.appleEnv)}${args.pathOrUrl}`;

  const headers = new Headers(args.init.headers ?? {});
  headers.set('Accept', 'application/json');
  if (!headers.has('Content-Type') && args.init.body) headers.set('Content-Type', 'application/json');

  if (args.useJwt) {
    const jwt = await createAppleAuthJwt({
      appleEnv: args.appleEnv,
      issuer: args.issuer,
      certificatePem: args.certificatePem,
      privateKeyPem: args.privateKeyPem,
    });
    headers.set('Authorization', `Bearer ${jwt}`);
  }

  return args.fetcher.fetch(url, { ...args.init, headers });
}

export async function registerMerchant(args: {
  fetcher: AppleFetcher;
  appleEnv: AppleEnv;
  useJwt: boolean;
  issuer: string;
  certificatePem: string;
  privateKeyPem: string;
  domain: string;
  encryptTo: string;
  partnerInternalMerchantIdentifier: string;
  partnerMerchantName: string;
}): Promise<void> {
  const body = {
    domainNames: [args.domain],
    encryptTo: args.encryptTo,
    partnerInternalMerchantIdentifier: args.partnerInternalMerchantIdentifier,
    partnerMerchantName: args.partnerMerchantName,
  };

  const res = await appleApiFetch({
    fetcher: args.fetcher,
    appleEnv: args.appleEnv,
    pathOrUrl: '/paymentservices/registerMerchant',
    init: { method: 'POST', body: JSON.stringify(body) },
    useJwt: args.useJwt,
    issuer: args.issuer,
    certificatePem: args.certificatePem,
    privateKeyPem: args.privateKeyPem,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`registerMerchant failed (${res.status}): ${text}`);
  }
}

export async function getMerchantDetails(args: {
  fetcher: AppleFetcher;
  appleEnv: AppleEnv;
  useJwt: boolean;
  issuer: string;
  certificatePem: string;
  privateKeyPem: string;
  merchantIdentifier: string;
}): Promise<any> {
  const res = await appleApiFetch({
    fetcher: args.fetcher,
    appleEnv: args.appleEnv,
    pathOrUrl: `/paymentservices/merchant/${encodeURIComponent(args.merchantIdentifier)}`,
    init: { method: 'GET' },
    useJwt: args.useJwt,
    issuer: args.issuer,
    certificatePem: args.certificatePem,
    privateKeyPem: args.privateKeyPem,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`getMerchantDetails failed (${res.status}): ${text}`);
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function unregisterMerchant(args: {
  fetcher: AppleFetcher;
  appleEnv: AppleEnv;
  useJwt: boolean;
  issuer: string;
  certificatePem: string;
  privateKeyPem: string;
  merchantIdentifier: string;
}): Promise<void> {
  const body = { merchantIdentifier: args.merchantIdentifier };
  const res = await appleApiFetch({
    fetcher: args.fetcher,
    appleEnv: args.appleEnv,
    pathOrUrl: '/paymentservices/unregisterMerchant',
    init: { method: 'POST', body: JSON.stringify(body) },
    useJwt: args.useJwt,
    issuer: args.issuer,
    certificatePem: args.certificatePem,
    privateKeyPem: args.privateKeyPem,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`unregisterMerchant failed (${res.status}): ${text}`);
  }
}

export async function createPaymentSession(args: {
  fetcher: AppleFetcher;
  validationUrl: string;
  merchantIdentifier: string;
  displayName: string;
  initiativeContext: string;
}): Promise<any> {
  const u = new URL(args.validationUrl);
  if (!u.hostname.includes('apple-pay-gateway') || !u.hostname.endsWith('.apple.com')) {
    throw new Error(`Refusing to call unexpected validationURL host: ${u.hostname}`);
  }

  const body = {
    merchantIdentifier: args.merchantIdentifier,
    displayName: args.displayName,
    initiative: 'web',
    initiativeContext: args.initiativeContext,
  };

  const res = await args.fetcher.fetch(args.validationUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`createPaymentSession failed (${res.status}): ${text}`);
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
