import { NextResponse } from 'next/server';
import { jsonError, jsonSuccess } from '@/lib/security/response';
import { errorLog } from '@/lib/security/logger';
import { createServerSupabaseClient } from '@/lib/supabase/server';

async function signOut() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut({ scope: 'local' });
}

export async function POST() {
  try {
    await signOut();
    return jsonSuccess({ loggedOut: true });
  } catch (error) {
    errorLog('Admin logout failed', { message: error.message });
    return jsonError('Unable to sign out', 500);
  }
}

export async function GET(request) {
  try {
    await signOut();
  } catch (error) {
    errorLog('Admin logout redirect failed', { message: error.message });
  }
  return NextResponse.redirect(new URL('/', request.nextUrl.origin));
}
