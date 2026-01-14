export function parseCookies(cookieHeader: string | null): Record<string, string> {
  const out: Record<string, string> = {};
  if (!cookieHeader) return out;
  const parts = cookieHeader.split(';');
  for (const part of parts) {
    const [k, ...rest] = part.trim().split('=');
    if (!k) continue;
    out[k] = decodeURIComponent(rest.join('=') ?? '');
  }
  return out;
}

export function serializeCookie(args: {
  name: string;
  value: string;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'Lax' | 'Strict' | 'None';
  path?: string;
  maxAgeSeconds?: number;
}): string {
  const parts: string[] = [];
  parts.push(`${args.name}=${encodeURIComponent(args.value)}`);
  parts.push(`Path=${args.path ?? '/'}`);
  if (args.maxAgeSeconds != null) parts.push(`Max-Age=${Math.floor(args.maxAgeSeconds)}`);
  if (args.httpOnly) parts.push('HttpOnly');
  if (args.secure) parts.push('Secure');
  if (args.sameSite) parts.push(`SameSite=${args.sameSite}`);
  return parts.join('; ');
}
