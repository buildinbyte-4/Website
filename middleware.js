import { NextResponse } from 'next/server';
import { verifyToken } from './lib/token';

// In-memory maps for rate limiting
const globalRateLimitMap = new Map();
const windowMs = 15 * 60 * 1000; // 15 minutes
const maxRequests = 100; // 100 requests per 15 minutes

/**
 * Checks if a request is rate limited.
 */
function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = globalRateLimitMap.get(ip) || [];
  
  // Keep only timestamps within the current window
  const activeTimestamps = timestamps.filter((ts) => now - ts < windowMs);
  
  if (activeTimestamps.length >= maxRequests) {
    return true;
  }
  
  activeTimestamps.push(now);
  globalRateLimitMap.set(ip, activeTimestamps);
  return false;
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';

  // 1. Payload Size Limitation (1MB max body size check)
  const method = request.method;
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 1048576) {
      return new NextResponse(
        JSON.stringify({ error: 'Payload too large. Body size limit is 1MB.' }),
        { status: 413, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  // 2. Global Rate Limiter for API Routes
  if (pathname.startsWith('/api/')) {
    if (isRateLimited(ip)) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  // 3. Admin Routes Protection
  if (pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get('admin_session')?.value;
    const verified = sessionCookie ? await verifyToken(sessionCookie) : null;
    
    if (!verified) {
      // Redirect unauthorized users to home page, instructing login display if desired
      const homeUrl = new URL('/', request.url);
      homeUrl.searchParams.set('adminRedirect', 'true');
      return NextResponse.redirect(homeUrl);
    }
  }

  // 4. CORS Dynamic Handling
  const origin = request.headers.get('origin');
  const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || 'http://localhost:8000,http://localhost:3000';
  const allowedOrigins = allowedOriginsEnv.split(',').map((o) => o.trim());

  let response;
  
  // Handle Preflight OPTIONS request
  if (method === 'OPTIONS' && origin && allowedOrigins.includes(origin)) {
    response = new NextResponse(null, { status: 204 });
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    return response;
  }

  response = NextResponse.next();

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  // 5. Enforce HTTP Security Headers Globally
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Force HTTPS via HSTS in production environments
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  } else {
    // Shorter cache during development / pre-prod audit
    response.headers.set('Strict-Transport-Security', 'max-age=300; includeSubDomains');
  }

  // Enforce Content-Security-Policy (CSP)
  const cspHeader = [
    "default-src 'self';",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://rfrowgjjwrwdcigftcjl.supabase.co;",
    "style-src 'self' 'unsafe-inline';",
    "img-src 'self' data: blob: https://api.dicebear.com https://rfrowgjjwrwdcigftcjl.supabase.co;",
    "connect-src 'self' https://rfrowgjjwrwdcigftcjl.supabase.co https://formsubmit.co;",
    "font-src 'self' data:;",
    "frame-ancestors 'none';",
    "object-src 'none';",
    "base-uri 'none';"
  ].join(' ');

  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

// Apply middleware configuration to match all paths except static resource files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - logo.jpg (logo file)
     * - templates/ (static templates folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|logo.jpg|templates/).*)',
  ],
};
