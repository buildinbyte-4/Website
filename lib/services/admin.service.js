import { verifyPassword } from '@/lib/crypto';
import { createSessionToken } from '@/lib/auth/session';
import { appLog, activityLog, securityLog } from '@/lib/security/logger';

export async function authenticateAdmin({ username, password, ip }) {
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const adminPasswordPlain = process.env.ADMIN_PASSWORD || 'admin';

  let isValid = false;

  if (username === adminUsername) {
    if (adminPasswordHash) {
      isValid = verifyPassword(password, adminPasswordHash);
    } else {
      isValid = password === adminPasswordPlain;
    }
  }

  if (!isValid) {
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
