import { supabase } from '@/lib/supabase';

export function getSupabaseClient() {
  if (!supabase) {
    throw new Error('Supabase client is not configured.');
  }

  return supabase;
}
