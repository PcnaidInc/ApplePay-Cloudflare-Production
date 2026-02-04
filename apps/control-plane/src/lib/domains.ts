export type DomainKind = 'apex' | 'www' | 'subdomain';

export function normalizeHostname(input: string): string {
  const h = (input ?? '').trim().toLowerCase();
  // Remove a trailing dot if someone pasted a FQDN like "example.com.".
  return h.endsWith('.') ? h.slice(0, -1) : h;
}

function parseHostname(hostname: string): { domain: string | null; subdomain: string | null } {
  const parts = hostname.split('.');
  if (parts.length < 2) {
    return { domain: null, subdomain: null };
  }

  // Simple heuristic: assume last two parts are the domain (e.g., example.com)
  // For multi-part TLDs like .co.uk, this may need adjustment
  const domain = parts.slice(-2).join('.');
  const subdomain = parts.length > 2 ? parts.slice(0, -2).join('.') : null;

  return { domain, subdomain };
}

export function getDomainInfo(hostname: string): {
  hostname: string;
  registrableDomain: string | null;
  subdomain: string | null;
  kind: DomainKind;
  apex: string | null;
  www: string | null;
} {
  const h = normalizeHostname(hostname);
  const p = parseHostname(h);

  // If parsing fails, treat as a generic subdomain.
  if (!p.domain) {
    return {
      hostname: h,
      registrableDomain: null,
      subdomain: null,
      kind: 'subdomain',
      apex: null,
      www: null,
    };
  }

  const apex = p.domain; // e.g. example.com or example.co.uk
  const www = `www.${apex}`;
  const subdomain = p.subdomain ?? null;

  let kind: DomainKind = 'subdomain';
  if (h === apex) kind = 'apex';
  else if (subdomain === 'www') kind = 'www';

  return {
    hostname: h,
    registrableDomain: apex,
    subdomain,
    kind,
    apex,
    www,
  };
}

/**
 * If the hostname is apex <-> www related, return the sibling hostname.
 * Otherwise return null.
 */
export function getWwwSibling(hostname: string): string | null {
  const info = getDomainInfo(hostname);
  if (info.kind === 'apex') return info.www;
  if (info.kind === 'www') return info.apex;
  return null;
}
