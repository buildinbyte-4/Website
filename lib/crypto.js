import crypto from 'crypto';

// Dynamically generate a session secret if not provided in env,
// ensuring sessions are secure but rotate on server restarts if unconfigured.
const sessionSecret = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');

/**
 * Hash a password using PBKDF2 with salt.
 * Uses 100,000 iterations and SHA-512.
 * @param {string} password - The plain password
 * @returns {string} The formatted salt and hash
 */
export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verify a password against a stored PBKDF2 hash.
 * @param {string} password - The plain password to verify
 * @param {string} storedHash - The stored salt:hash string
 * @returns {boolean} True if password matches, false otherwise
 */
export function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(':')) {
    return false;
  }
  const [salt, hash] = storedHash.split(':');
  const verifyHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
}

/**
 * Sign a session payload into a secure HMAC token.
 * @param {object} payload - The data to store in the token
 * @returns {string} The base64-encoded token and signature
 */
export function signToken(payload) {
  const payloadStr = JSON.stringify({ ...payload, exp: Date.now() + 3600000 }); // 1 hour expiration
  const payloadB64 = Buffer.from(payloadStr).toString('base64');
  const signature = crypto.createHmac('sha256', sessionSecret).update(payloadB64).digest('hex');
  return `${payloadB64}.${signature}`;
}

/**
 * Verify an HMAC token and extract the payload.
 * @param {string} token - The secure session token
 * @returns {object|null} The verified payload, or null if invalid or expired
 */
export function verifyToken(token) {
  if (!token || !token.includes('.')) {
    return null;
  }
  const [payloadB64, signature] = token.split('.');
  const expectedSignature = crypto.createHmac('sha256', sessionSecret).update(payloadB64).digest('hex');
  
  if (signature !== expectedSignature) {
    return null;
  }

  try {
    const payloadStr = Buffer.from(payloadB64, 'base64').toString('utf8');
    const payload = JSON.parse(payloadStr);
    
    // Check expiration
    if (payload.exp && Date.now() > payload.exp) {
      return null; // Expired
    }
    
    return payload;
  } catch (err) {
    return null;
  }
}
