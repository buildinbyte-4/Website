class InMemoryRateLimiter {
  constructor(windowMs = 15 * 60 * 1000, maxRequests = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.entries = new Map();
  }

  isAllowed(key) {
    const now = Date.now();
    const entry = this.entries.get(key) || [];
    const activeEntries = entry.filter((timestamp) => now - timestamp < this.windowMs);

    if (activeEntries.length >= this.maxRequests) {
      this.entries.set(key, activeEntries);
      return false;
    }

    activeEntries.push(now);
    this.entries.set(key, activeEntries);
    return true;
  }
}

export const rateLimiter = new InMemoryRateLimiter();

export function checkRateLimit(key) {
  return rateLimiter.isAllowed(key);
}

export { checkRateLimit as checkLoginRateLimit };