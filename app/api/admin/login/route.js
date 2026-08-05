import { NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyPassword } from '@/lib/crypto';
import { signToken } from '@/lib/token';

const rateLimitMap = new Map();

function applyRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const limit = 5;

  const timestamps = rateLimitMap.get(ip) || [];
  const activeTimestamps = timestamps.filter((ts) => now - ts < windowMs);

  if (activeTimestamps.length >= limit) {
    return true;
  }

  activeTimestamps.push(now);
  rateLimitMap.set(ip, activeTimestamps);
  return false;
}

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';

  if (applyRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many login attempts. Please try again in a minute.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request payload' },
        { status: 400 }
      );
    }

    const { username, password } = validation.data;
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
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const token = await signToken({ username });
    const response = NextResponse.json({ success: true });
    
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 3600,
    });

    return response;
  } catch (error) {
    console.error('Admin API Login Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
