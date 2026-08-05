import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ success: true });

    response.cookies.set('admin_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });

    response.headers.set('Clear-Site-Data', '"cookies", "storage", "cache"');

    return response;
  } catch (error) {
    console.error('Admin API Logout Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const origin = process.env.NEXT_PUBLIC_APP_URL || request.headers.get('origin') || 'http://localhost:8000';
    const response = NextResponse.redirect(new URL('/', origin));

    response.cookies.set('admin_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });

    response.headers.set('Clear-Site-Data', '"cookies", "storage", "cache"');

    return response;
  } catch (error) {
    console.error('Admin API Logout GET Error:', error);
    const origin = 'http://localhost:8000';
    return NextResponse.redirect(new URL('/', origin));
  }
}
