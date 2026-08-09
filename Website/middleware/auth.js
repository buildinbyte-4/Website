import { NextResponse } from 'next/server';
import { verifySessionToken, getSessionCookieName } from '@/lib/auth/session';

export async function protectAdminRoute(request) {
  console.log('protectAdminRoute called');
  const cookieName = getSessionCookieName();
  const token = request.cookies.get(cookieName)?.value;
  const payload = token ? verifySessionToken(token) : null;
  console.log('cookieName:', cookieName, 'token:', token, 'payload:', payload);

  if (!payload || payload.role !== 'admin') {
    const redirectUrl = new URL('/', request.url);
    redirectUrl.searchParams.set('adminRedirect', 'true');
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}
