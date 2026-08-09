import { NextResponse } from 'next/server';
import { protectAdminRoute } from '@/middleware/auth';
import { applyRateLimit } from '@/middleware/rate-limit';
import { applySecurityHeaders } from './middleware/security';

console.log('middleware.js loaded');

export const runtime = 'nodejs';

export async function middleware(request) {
  console.log('middleware called for:', request.nextUrl.pathname);
  const { pathname } = request.nextUrl;
  const method = request.method;

  if (pathname.startsWith('/api/')) {
    const rateLimitedResponse = applyRateLimit(request);
    if (rateLimitedResponse) {
      return rateLimitedResponse;
    }
  }

  if (pathname.startsWith('/admin')) {
    return protectAdminRoute(request);
  }

  if (method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 });
    return applySecurityHeaders(request, response);
  }

  const response = NextResponse.next();
  return applySecurityHeaders(request, response);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logo.jpg|templates/).*)'],
};