class InMemoryRateLimiter {
  constructor(windowMs = 15 * 60 * 1000, maxRequests = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.entries = new Map();
    this.operations = 0;
  }

  isAllowed(key) {
    const now = Date.now();
    this.operations += 1;
    if (this.operations % 100 === 0) {
      for (const [entryKey, timestamps] of this.entries) {
        if (!timestamps.some((timestamp) => now - timestamp < this.windowMs)) {
          this.entries.delete(entryKey);
        }
      }
    }
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
const loginIpRateLimiter = new InMemoryRateLimiter(15 * 60 * 1000, 10);
const loginAccountRateLimiter = new InMemoryRateLimiter(15 * 60 * 1000, 5);
const clientErrorRateLimiter = new InMemoryRateLimiter(60 * 1000, 10);

export function checkRateLimit(key) {
  return rateLimiter.isAllowed(key);
}

export function checkLoginRateLimit(ipKey, accountKey) {
  return loginIpRateLimiter.isAllowed(ipKey) && loginAccountRateLimiter.isAllowed(accountKey);
}

export function checkClientErrorRateLimit(key) {
  return clientErrorRateLimiter.isAllowed(key);
}
