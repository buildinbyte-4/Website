const { test, expect } = require('@playwright/test');

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
    await expect(page.locator('body')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Custom systems & website templates' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Custom Systems', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Website Templates', exact: true })).toBeVisible();
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

  test('should allow a same-origin template to render in an iframe', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      const frame = document.createElement('iframe');
      frame.id = 'template-policy-check';
      frame.src = '/templates/luxury-hotel/index.html';
      document.body.appendChild(frame);
    });
    const template = page.frameLocator('#template-policy-check');
    await expect(template.locator('body')).toBeVisible();
  });

  test('should group every live project once and recover from a broken preview', async ({ page }) => {
    await page.route('**/*', async (route) => {
      const decodedUrl = decodeURIComponent(route.request().url());
      if (decodedUrl.includes('/project-previews/')) {
        await route.abort();
        return;
      }
      await route.continue();
    });
    await page.goto('/');

    const customSystems = page.locator('section[aria-labelledby="custom-systems-heading"] article');
    const websiteTemplates = page.locator('section[aria-labelledby="website-templates-heading"] article');
    await expect(customSystems.first()).toBeVisible();
    await expect(websiteTemplates.first()).toBeVisible();

    const titles = await page.locator('#case-studies article h4').allTextContents();
    expect(titles.length).toBeGreaterThan(0);
    expect(new Set(titles).size).toBe(titles.length);

    const previewCard = websiteTemplates.filter({ hasText: 'Luxury Hotel Website Template' });
    await expect(previewCard.locator('img')).toHaveCount(0);
    await expect(previewCard).toContainText('LH');
  });

  test('should remain usable across supported viewport widths and reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Custom systems & website templates' })).toBeVisible();

    for (const width of [320, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await expect(page.getByRole('heading', { name: 'Custom systems & website templates' })).toBeVisible();
      const dimensions = await page.evaluate(() => ({
        viewport: window.innerWidth,
        page: document.documentElement.scrollWidth,
      }));
      expect(dimensions.page).toBeLessThanOrEqual(dimensions.viewport + 1);
    }

    const animationName = await page.locator('.site-star').first().evaluate((star) => getComputedStyle(star).animationName);
    expect(animationName).toBe('none');
  });

  test('project inquiry page stays usable across supported viewport widths', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('heading', { name: 'Tell us what needs to work better.' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'An engagement shaped around the work.' })).toBeVisible();
    await expect(page.getByLabel('What do you need? *')).toBeVisible();
    await expect(page.getByLabel('Estimated budget range')).toBeVisible();
    await expect(page.getByText('This is an initial estimate, not the final budget.')).toBeVisible();
    await expect(page.getByLabel('Target start')).toBeVisible();

    for (const width of [320, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({
        viewport: window.innerWidth,
        page: document.documentElement.scrollWidth,
      }));
      expect(dimensions.page).toBeLessThanOrEqual(dimensions.viewport + 1);
    }
  });
});
