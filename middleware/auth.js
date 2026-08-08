import { NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/auth/session';

export async function protectAdminRoute(request) {
  const token = request.cookies.get('admin_session')?.value;
  const payload = token ? verifySessionToken(token) : null;

  if (!payload || payload.role !== 'admin') {
    const redirectUrl = new URL('/', request.url);
    redirectUrl.searchParams.set('adminRedirect', 'true');
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}
