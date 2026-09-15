import { ApiError, jsonError, jsonSuccess } from '@/lib/security/response';
import { errorLog, securityLog } from '@/lib/security/logger';
import { checkLoginRateLimit } from '@/lib/security/rate-limiter';
import { loginSchema, parseJsonBody } from '@/lib/validation/schemas';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';

  if (!checkLoginRateLimit(`admin-login:${ip}`)) {
    return jsonError('Too many login attempts. Please try again later.', 429);
  }

  try {
    const credentials = await parseJsonBody(request, loginSchema);
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword(credentials);

    if (error || !data.user) {
      securityLog('Failed admin login attempt', { ip });
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
