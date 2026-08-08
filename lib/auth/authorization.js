import { verifySessionToken } from '@/lib/auth/session';
import { jsonError } from '@/lib/security/response';

export async function getAuthenticatedUser(request) {
  const token = request.cookies.get('admin_session')?.value;
  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}

export async function requireAuth(request, options = {}) {
  const user = await getAuthenticatedUser(request);

  if (!user) {
    return {
      user: null,
      response: jsonError('Unauthorized', 401),
    };
  }

  if (options.role && user.role !== options.role) {
    return {
      user: null,
      response: jsonError('Forbidden', 403),
    };
  }

  if (options.permission && !user.permissions?.includes(options.permission)) {
    return {
      user: null,
      response: jsonError('Forbidden', 403),
    };
  }

  return {
    user,
    response: null,
  };
}
