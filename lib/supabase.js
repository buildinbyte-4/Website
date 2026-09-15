'use client';

import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  console.warn('Supabase URL or publishable key is missing from environment variables.');
}

export const supabase = supabaseUrl && supabasePublishableKey
  ? createBrowserClient(supabaseUrl, supabasePublishableKey)
  : null;
