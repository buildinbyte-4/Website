import { NextResponse } from 'next/server';
import crypto from 'crypto';

export function applySecurityHeaders(request, response) {
  const origin = request.headers.get('origin');
  const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || 'http://localhost:8000,http://localhost:3000';
  const allowedOrigins = allowedOriginsEnv.split(',').map((value) => value.trim());

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (process.env.NODE_ENV === 'production') {
    const nonce = crypto.randomBytes(16).toString('base64');

    const cspHeader = [
      "default-src 'self';",
      `script-src 'self' https://rfrowgjjwrwdcigftcjl.supabase.co 'nonce-${nonce}';`,
      `style-src 'self' https://api.dicebear.com 'nonce-${nonce}';`,
      "img-src 'self' data: blob: https://api.dicebear.com https://rfrowgjjwrwdcigftcjl.supabase.co;",
      "connect-src 'self' https://rfrowgjjwrwdcigftcjl.supabase.co https://formsubmit.co ws: wss:;",
      "font-src 'self' data:;",
      "frame-ancestors 'none';",
      "object-src 'none';",
      "base-uri 'none';",
    ].join(' ');

    response.headers.set('Content-Security-Policy', cspHeader);
    response.headers.set('X-Content-Security-Policy', cspHeader);

    // Additional security headers
    response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
    response.headers.set('X-Download-Options', 'noopen');
    response.headers.set('X-DNS-Prefetch-Control', 'off');
  }

  return response;
}