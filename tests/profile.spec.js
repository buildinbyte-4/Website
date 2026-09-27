const { test, expect } = require('@playwright/test');

test.describe('Profile route', () => {
  test('requires authentication and preserves the profile destination', async ({ page }) => {
    await page.goto('/profile');

    await expect(page).toHaveURL(/\/\?(?:login=1&)?next=(?:%2F|\/)profile$/);
  });
});
