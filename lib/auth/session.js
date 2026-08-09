import crypto from 'crypto';
import { ensureRuntimeEnv } from '@/lib/env';

function encodeBase64Url(value) {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function decodeBase64Url(value) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

let devSecret = null;

function getSessionSecret() {
  ensureRuntimeEnv();
  const secret = process.env.SESSION_SECRET;
  if (secret) {
    return secret;
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('SESSION_SECRET must be set in production');
  }

  // In development, generate a secret once and reuse it to avoid changing on each call
  if (devSecret === null) {
    devSecret = crypto.randomBytes(32).toString('hex');
    console.warn('WARNING: SESSION_SECRET not set, using temporary secret for development. Sessions will not persist across restarts.');
  }
  return devSecret;
}

function createSignature(payloadSegment) {
  const secret = getSessionSecret();
  return crypto.createHmac('sha256', secret).update(payloadSegment).digest('hex');
}

function verifySignature(payloadSegment, signature) {
  if (!payloadSegment || !signature) {
    return false;
  }
  const expected = Buffer.from(createSignature(payloadSegment), 'hex');
  let provided;
  try {
    provided = Buffer.from(signature, 'hex');
  } catch (error) {
    return false;
  }
  if (provided.length !== expected.length) {
    return false;
  }
  return crypto.timingSafeEqual(provided, expected);
}

export function createSessionToken(payload, expiresInSeconds = 3600) {
  const body = {
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
  };

  const payloadSegment = encodeBase64Url(JSON.stringify(body));
  const signature = createSignature(payloadSegment);
  return `${payloadSegment}.${signature}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) {
    return null;
  }

  try {
    const [payloadSegment, signature] = token.split('.');
    if (!payloadSegment || !signature) {
      return null;
    }

    if (!verifySignature(payloadSegment, signature)) {
      return null;
    }

    const payload = JSON.parse(decodeBase64Url(payloadSegment));
    if (!payload.exp || payload.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
}

export function getSessionCookieName() {
  return process.env.NODE_ENV === 'production' ? '__Host-admin_session' : 'admin_session';
}

export function createSessionCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60,
  };
}

export function createClearSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  };
}