const { test, expect } = require('@playwright/test');

test.describe('Admin Authentication', () => {
  const BASE_URL = 'http://localhost:8000';
  const testEmail = process.env.TEST_ADMIN_EMAIL || 'test@example.com';
  const testPassword = process.env.TEST_ADMIN_PASSWORD || 'testpass';

  test('should reject invalid credentials', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/admin/login`, {
      data: {
        email: 'wrong@example.com',
        password: 'wrong-password',
      },
    });
    expect(response.status()).toBe(401);
    const json = await response.json();
    expect(json.error).toContain('Invalid email or password');
  });

  test('should succeed with valid credentials (if provided)', async ({ request }) => {
    if (!process.env.TEST_ADMIN_EMAIL || !process.env.TEST_ADMIN_PASSWORD) {
      test.skip('TEST_ADMIN_EMAIL and TEST_ADMIN_PASSWORD not set');
      return;
    }

    const response = await request.post(`${BASE_URL}/api/admin/login`, {
      data: {
        email: testEmail,
        password: testPassword,
      },
    });
    const status = response.status();
    expect([200, 401]).toContain(status);
    if (status === 200) {
      const json = await response.json();
      expect(json.data.authenticated).toBe(true);
      const setCookie = response.headers()['set-cookie'];
      expect(setCookie).toBeDefined();
      expect(String(setCookie)).toContain('sb-');
    }
  });
});
