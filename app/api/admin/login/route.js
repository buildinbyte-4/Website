import { ApiError, jsonError, jsonSuccess } from '@/lib/security/response';
import { errorLog, securityLog } from '@/lib/security/logger';
import { checkLoginRateLimit } from '@/lib/security/rate-limiter';
import { getTrustedClientIp } from '@/lib/security/client-ip';
import { loginSchema, parseJsonBody } from '@/lib/validation/schemas';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { createHash } from 'node:crypto';

export async function POST(request) {
  const ip = getTrustedClientIp(request);

  try {
    const credentials = await parseJsonBody(request, loginSchema);
    const accountKey = createHash('sha256').update(credentials.email.toLowerCase()).digest('hex');

    if (!checkLoginRateLimit(`admin-login-ip:${ip}`, `admin-login-account:${accountKey}`)) {
      return jsonError(
        'Too many login attempts. Please try again later.',
        429,
        null,
        { 'Retry-After': '900' },
      );
    }

    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword(credentials);

    if (error || !data.user) {
      securityLog('Failed admin login attempt', { ip });
      if (error?.status === 429) {
        return jsonError('Authentication rate limit reached. Please try again later.', 429, null, { 'Retry-After': '900' });
      }
      return jsonError('Invalid email or password', 401);
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .maybeSingle();

    if (profileError || profile?.role !== 'admin') {
      await supabase.auth.signOut();
      securityLog('Non-admin attempted admin login', { ip, userId: data.user.id });
      return jsonError('Forbidden', 403);
    }

    return jsonSuccess({ authenticated: true, role: 'admin' });
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonError(error.message, error.status, error.details);
    }
    errorLog('Admin login failed', { ip, message: error.message });
    return jsonError('Internal server error', 500);
  }
}
