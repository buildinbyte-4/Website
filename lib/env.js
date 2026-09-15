function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function ensureRuntimeEnv() {
  if (process.env.NODE_ENV === 'production') {
    getRequiredEnv('NEXT_PUBLIC_SUPABASE_URL');
    if (!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY && !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('Missing required environment variable: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY');
    }
  }
}
