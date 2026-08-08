import { NextResponse } from 'next/server';
import { createClearSessionCookieOptions } from '@/lib/auth/session';
import { jsonSuccess, jsonError } from '@/lib/security/response';
import { activityLog, errorLog } from '@/lib/security/logger';

export async function POST(request) {
  try {
    const response = jsonSuccess({ loggedOut: true });
    response.cookies.set('admin_session', '', createClearSessionCookieOptions());
    response.headers.set('Clear-Site-Data', '"cookies", "storage", "cache"');

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
    activityLog('admin_logout', { ip });
    return response;
  } catch (error) {
    errorLog('Admin logout failed', { message: error.message });
    return jsonError('Internal server error', 500);
  }
}

export async function GET(request) {
  try {
    const origin = process.env.NEXT_PUBLIC_APP_URL || request.headers.get('origin') || 'http://localhost:8000';
    const response = NextResponse.redirect(new URL('/', origin));
    response.cookies.set('admin_session', '', createClearSessionCookieOptions());
    response.headers.set('Clear-Site-Data', '"cookies", "storage", "cache"');

    return response;
  } catch (error) {
    errorLog('Admin logout redirect failed', { message: error.message });
    const origin = 'http://localhost:8000';
    return NextResponse.redirect(new URL('/', origin));
  }
}
