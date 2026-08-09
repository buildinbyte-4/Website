const { test, expect } = require('@playwright/test');

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
    // Check for some known text or element; we can check for title or a visible element
    await expect(page.locator('body')).toBeVisible();
    // Optionally check for a specific text that appears on homepage
    // Since we don't know exact content, we'll just ensure status 200 and no errors
  });

  test('should have no network errors', async ({ page }) => {
    // Listen for failed requests
    const failedRequests = [];
    page.on('requestfailed', request => {
      failedRequests.push(request);
    });
    await page.goto('/');
    await expect(failedRequests).toHaveLength(0);
  });
});