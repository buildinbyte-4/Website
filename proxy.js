import { refreshSupabaseSession } from '@/lib/supabase/proxy';

export async function proxy(request) {
  return refreshSupabaseSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|apple-icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
