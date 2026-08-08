import crypto from 'crypto';
import { ensureRuntimeEnv } from '@/lib/env';

function encodeBase64Url(value) {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function decodeBase64Url(value) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function getSessionSecret() {
  ensureRuntimeEnv();
  return process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
}

function createSignature(payloadSegment) {
  const secret = getSessionSecret();
  return crypto.createHmac('sha256', secret).update(payloadSegment).digest('hex');
}

function verifySignature(payloadSegment, signature) {
  const expectedSignature = createSignature(payloadSegment);
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
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

export function createSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
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
