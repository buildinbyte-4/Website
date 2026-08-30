import { NextResponse } from 'next/server';
import { getSessionCookieName, verifySessionToken } from '@/lib/auth/session';

export function proxy(request) {
  const token = request.cookies.get(getSessionCookieName())?.value;
  const session = token ? verifySessionToken(token) : null;

  if (session?.role === 'admin') {
    return NextResponse.next();
  }

  const redirectUrl = new URL('/', request.url);
  redirectUrl.searchParams.set('adminRedirect', 'true');
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ['/admin/:path*'],
};
