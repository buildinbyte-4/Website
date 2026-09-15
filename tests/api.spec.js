const { test, expect } = require('@playwright/test');

test.describe('API Endpoints', () => {
  const BASE_URL = 'http://localhost:8000';

  test('GET /api/health reports application and database health', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/health`);
    expect([200, 503]).toContain(response.status());
    const json = await response.json();
    expect(json.checks.application).toBe('ok');
    expect(['ok', 'unavailable']).toContain(json.checks.database);
  });

  test('security headers protect pages while allowing same-origin template previews', async ({ request }) => {
    const pageResponse = await request.get(BASE_URL);
    expect(pageResponse.headers()['x-powered-by']).toBeUndefined();
    expect(pageResponse.headers()['x-frame-options']).toBe('DENY');
    expect(pageResponse.headers()['content-security-policy']).toContain("frame-ancestors 'none'");

    const templateResponse = await request.get(`${BASE_URL}/templates/luxury-hotel/index.html`);
    expect(templateResponse.headers()['x-frame-options']).toBe('SAMEORIGIN');
    expect(templateResponse.headers()['content-security-policy']).toContain("frame-ancestors 'self'");
  });

  test('oversized JSON requests are rejected before parsing', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/inquiries`, {
      headers: { 'Content-Type': 'application/json' },
      data: { scope: 'x'.repeat(20_000) },
    });
    expect(response.status()).toBe(413);
  });

  test('POST /api/admin/login returns 401 for invalid credentials', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/admin/login`, {
      data: {
        email: 'wrong@example.com',
        password: 'wrong-password',
      },
    });
    expect([401, 429]).toContain(response.status());
    const json = await response.json();
    expect(json.error).toMatch(/Invalid email or password|Too many login attempts|Authentication rate limit/);
  });

  test('POST /api/admin/logout is idempotent', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/admin/logout`, {
      data: {},
    });
    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(json.data.loggedOut).toBe(true);
  });

  test('POST /api/inquiries requires authentication', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/inquiries`, {
      data: {
        name: 'Test Visitor',
        email: 'visitor@example.com',
        company: 'Example Company',
        scope: 'A sufficiently detailed test inquiry that must not be stored.',
        projectType: 'Test Project',
      },
    });
    expect(response.status()).toBe(401);
    const json = await response.json();
    expect(json.success).toBe(false);
  });

  test('GET /api/admin/logout redirects to homepage', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/admin/logout`, {
      maxRedirects: 0,
    });
    // Expect redirect status (307 etc)
    const status = response.status();
    const redirectUrl = response.headers()['location'];
    expect([301, 302, 307, 308]).toContain(status);
    expect(redirectUrl).toContain('/');
  });
});
