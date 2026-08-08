import { NextResponse } from 'next/server';

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
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

    const cspHeader = [
      "default-src 'self';",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://rfrowgjjwrwdcigftcjl.supabase.co;",
      "style-src 'self' 'unsafe-inline';",
      "img-src 'self' data: blob: https://api.dicebear.com https://rfrowgjjwrwdcigftcjl.supabase.co;",
      "connect-src 'self' https://rfrowgjjwrwdcigftcjl.supabase.co https://formsubmit.co ws: wss:;",
      "font-src 'self' data:;",
      "frame-ancestors 'none';",
      "object-src 'none';",
      "base-uri 'none';",
    ].join(' ');

    response.headers.set('Content-Security-Policy', cspHeader);
  }

  return response;
}
