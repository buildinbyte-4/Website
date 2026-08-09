import { NextResponse } from 'next/server';
import { createSessionCookieOptions, getSessionCookieName } from '@/lib/auth/session';
import { parseJsonBody, loginSchema } from '@/lib/validation/schemas';
import { authenticateAdmin } from '@/lib/services/admin.service';
import { jsonError, jsonSuccess, ApiError } from '@/lib/security/response';
import { appLog, errorLog } from '@/lib/security/logger';
import { checkLoginRateLimit } from '@/lib/security/rate-limiter';

export async function POST(request) {
  console.log('Login route hit!');
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';

  // Stricter rate-limit for the admin login endpoint
  if (!checkLoginRateLimit(ip)) {
    errorLog('Admin login rate-limited', { ip });
    return jsonError('Too many login attempts. Please try again later.', 429);
  }

  try {
    const body = await parseJsonBody(request, loginSchema);
    const result = await authenticateAdmin({ username: body.username, password: body.password, ip });

    if (!result.ok) {
      return jsonError(result.error, result.status);
    }

    const response = jsonSuccess({ authenticated: true }, 200);
    response.cookies.set(getSessionCookieName(), result.token, createSessionCookieOptions());

    appLog('Admin login succeeded', { ip });
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      errorLog('Admin login validation failed', { ip, message: error.message, status: error.status });
      return jsonError(error.message, error.status, error.details);
    }

    errorLog('Admin login failed', { ip, message: error.message });
    return jsonError('Internal server error', 500);
  }
}