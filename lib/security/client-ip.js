import { isIP } from 'node:net';

const ALLOWED_PROXY_HEADERS = new Set([
  'cf-connecting-ip',
  'fly-client-ip',
  'x-forwarded-for',
  'x-real-ip',
  'x-vercel-forwarded-for',
]);

export function getTrustedClientIp(request) {
  const configuredHeader = (
    process.env.TRUSTED_PROXY_IP_HEADER
    || (process.env.VERCEL ? 'x-vercel-forwarded-for' : '')
    || (process.env.CF_PAGES ? 'cf-connecting-ip' : '')
  ).trim().toLowerCase();

  if (!configuredHeader || !ALLOWED_PROXY_HEADERS.has(configuredHeader)) {
    return process.env.NODE_ENV === 'production' ? 'unconfigured-proxy' : 'local-development';
  }

  const rawValue = request.headers.get(configuredHeader);
  const candidate = configuredHeader.includes('forwarded-for')
    ? rawValue?.split(',')[0]?.trim()
    : rawValue?.trim();

  return candidate && isIP(candidate) ? candidate : 'invalid-proxy-address';
}
