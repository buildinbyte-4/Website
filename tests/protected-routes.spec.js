const { test, expect } = require('@playwright/test');

test.describe('Protected Routes', () => {
  const BASE_URL = 'http://localhost:8000';

  test('should redirect unauthenticated admin access to the login panel', async ({ page }) => {
    await page.goto(`${BASE_URL}/admin`);
    // Wait for navigation to complete
    await page.waitForURL(url => {
      return url.pathname === '/' && url.searchParams.get('login') === '1';
    });
    await expect(page).toHaveURL(`${BASE_URL}/?login=1`);
  });

  test('should allow access after authentication (if credentials provided)', async ({ page, context }) => {
    if (!process.env.TEST_ADMIN_EMAIL || !process.env.TEST_ADMIN_PASSWORD) {
      test.skip('TEST_ADMIN_EMAIL and TEST_ADMIN_PASSWORD not set');
      return;
    }

    // First, log in via API to get session cookie
    const loginResponse = await context.request.post(`${BASE_URL}/api/admin/login`, {
      data: {
        email: process.env.TEST_ADMIN_EMAIL,
        password: process.env.TEST_ADMIN_PASSWORD,
      },
    });
    expect(loginResponse.ok()).toBeTruthy();

    // Now visit admin page
    await page.goto(`${BASE_URL}/admin`);
    // Should not redirect; we expect to see admin page content
    await expect(page).toHaveURL(`${BASE_URL}/admin`);
    // Optionally check for some admin-specific text
    await expect(page.locator('body')).toBeVisible();
  });
});
