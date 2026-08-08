function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function ensureRuntimeEnv() {
  if (process.env.NODE_ENV === 'production') {
    getRequiredEnv('SESSION_SECRET');
  }
}
