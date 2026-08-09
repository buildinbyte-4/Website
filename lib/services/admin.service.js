import { verifyPassword, safeEqual } from '@/lib/crypto';
import { createSessionToken } from '@/lib/auth/session';
import { appLog, activityLog, securityLog } from '@/lib/security/logger';

const FAILED_LOGIN_DELAY_MS = 250;

export async function authenticateAdmin({ username, password, ip }) {
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  // Always run a constant-time compare to avoid username enumeration
  const usernameMatches = typeof username === 'string' && safeEqual(String(username), String(adminUsername));

  if (!adminPasswordHash) {
    // If hash is missing, treat as server configuration error
    securityLog('Admin password hash not configured', { username, ip });
    return { ok: false, error: 'Server configuration error', status: 500 };
  }

  const passwordValid = verifyPassword(password, adminPasswordHash);

  if (!usernameMatches || !passwordValid) {
    // Constant-time-ish delay to slow brute force attempts
    await new Promise((resolve) => setTimeout(resolve, FAILED_LOGIN_DELAY_MS));
    securityLog('Failed admin login attempt', { username, ip });
    return { ok: false, error: 'Invalid username or password', status: 401 };
  }

  const token = createSessionToken({ username, role: 'admin', permissions: ['read:admin', 'write:admin'] }, 3600);
  activityLog('admin_login', { username, ip });
  appLog('Admin authenticated', { username, ip });

  return {
    ok: true,
    token,
    status: 200,
  };
}