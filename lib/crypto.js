import crypto from 'crypto';

const sessionSecret = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(':')) {
    return false;
  }
  const [salt, expectedHash] = storedHash.split(':');
  const computedHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');
  const expected = Buffer.from(expectedHash, 'hex');

  if (expected.length !== computedHash.length) {
    return false;
  }

  return crypto.timingSafeEqual(expected, computedHash);
}

export function safeEqual(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}
