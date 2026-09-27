const { test, expect } = require('@playwright/test');

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
    await expect(page.locator('body')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'The BuildInByte digital shelf.' })).toBeVisible();
    await expect(page.getByText('Available now · Source code')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Custom systems & website templates' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Custom Systems', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Website Templates', exact: true })).toBeVisible();
    await expect(page.getByText('We usually respond within 24–48 business hours.')).toHaveCount(0);
  });

  test('keeps response-time messaging out of the inquiry entry stage', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Book a scoping call' }).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('Share a few details so our delivery team can understand what you need');
    await expect(dialog.getByText(/24–48 business hours/)).toHaveCount(0);
  });

  test('digital products section offers Payflow without collecting payment credentials', async ({ page }) => {
    await page.goto('/');

    const products = page.locator('#digital-products');
    await expect(products).toContainText('Original digital products designed, built, and released by our team.');
    await expect(products).toContainText('Payflow Self-Hosted Payment Starter Kit');
    await expect(products).toContainText(/\$20|₹2/);
    await expect(products.getByLabel('Name')).toBeVisible();
    await expect(products.getByLabel('Delivery email')).toBeVisible();
    await expect(products.getByText('Payment details stay with the payment provider.')).toBeVisible();
    await expect(products.locator('input[autocomplete="cc-number"], input[autocomplete="cc-csc"]')).toHaveCount(0);
    await expect(page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Products', exact: true })).toHaveAttribute('href', '/#digital-products');
    await expect(page.getByText('Success Rate', { exact: true })).toHaveCount(0);
  });

  test('starts a Payflow checkout through the server route', async ({ page }) => {
    let checkoutRequest;
    await page.route('**/api/payments/checkout', async (route) => {
      checkoutRequest = route.request();
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, data: { paymentId: 'pay_test_12345678', checkoutUrl: 'http://localhost:8000/checkout/result', status: 'CREATED', product: { name: 'Payflow Self-Hosted Payment Starter Kit' } } }),
      });
    });
    await page.goto('/#digital-products');
    await expect(page.getByLabel('Loading projects')).toHaveCount(0);
    await expect(page.getByRole('button', { name: /Buy source code — (?:\$20|₹2)/ })).toBeEnabled();
    await page.locator('#digital-products form').evaluate((form) => {
      form.elements.name.value = 'Test Buyer';
      form.elements.email.value = 'buyer@example.com';
      form.elements.acceptedTerms.checked = true;
      form.requestSubmit();
    });
    await expect.poll(() => checkoutRequest).toBeTruthy();
    expect(checkoutRequest.headers()['idempotency-key']).toBeTruthy();
    expect(checkoutRequest.postDataJSON()).toEqual({
      name: 'Test Buyer',
      email: 'buyer@example.com',
      acceptedTerms: true,
      countryCode: expect.stringMatching(/^[A-Z]{2}$/),
    });
    await expect(page).toHaveURL('/checkout/result');
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

  test('routes the navbar CTA to contact and opens the compact quick-message dialog', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('link', { name: 'Talk to us' })).toHaveAttribute('href', '/contact#project-brief');
    await page.getByRole('button', { name: 'Open quick contact form' }).click();

    const dialog = page.getByRole('dialog', { name: 'What can we help with?' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByLabel('Gmail address')).toBeVisible();
    await expect(dialog.getByLabel('Your message')).toBeVisible();
    await expect(dialog.locator('input, textarea')).toHaveCount(2);
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
    await expect(page.getByLabel('Estimated budget range')).toContainText(/Select a range \((?:INR|USD)\)/);
    await expect(page.getByLabel('Estimated budget range').getByRole('option', { name: 'Custom range' })).toHaveCount(1);
    await expect(page.getByText('This is an initial estimate, not the final budget.')).toBeVisible();
    await expect(page.getByLabel('Target start')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Let’s build something useful.' })).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Start a conversation' })).toHaveCount(0);

    for (const width of [320, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({
        viewport: window.innerWidth,
        page: document.documentElement.scrollWidth,
      }));
      expect(dimensions.page).toBeLessThanOrEqual(dimensions.viewport + 1);
    }
  });

  test('custom budget range reveals explicit currency fields', async ({ page }) => {
    await page.goto('/contact');
    const budget = page.getByLabel('Estimated budget range');
    await expect(budget).toContainText(/Select a range \((?:INR|USD)\)/);
    const selectedCurrency = (await budget.locator('option').first().textContent()).includes('INR') ? 'INR' : 'USD';
    const symbol = selectedCurrency === 'INR' ? '₹' : '$';
    await budget.selectOption('custom');

    await expect(page.getByRole('group', { name: `Custom budget range (${selectedCurrency})` })).toBeVisible();
    await expect(page.getByLabel(`Minimum (${symbol})`)).toBeVisible();
    await expect(page.getByLabel(`Maximum (${symbol})`)).toBeVisible();
  });
});

test.describe('United States regional budget', () => {
  test.use({ locale: 'en-US', timezoneId: 'America/New_York' });

  test('uses dollar ranges outside India', async ({ page }) => {
    await page.goto('/contact');
    const budget = page.getByLabel('Estimated budget range');

    await expect(budget.getByRole('option', { name: 'Select a range (USD)' })).toHaveCount(1);
    await expect(budget.getByRole('option', { name: '$150–$300' })).toHaveCount(1);
    await expect(budget.getByRole('option', { name: 'Custom range' })).toHaveCount(1);
  });
});

test.describe('Indian regional budget', () => {
  test.use({ locale: 'en-IN', timezoneId: 'Asia/Kolkata' });

  test('uses rupee ranges for visitors in India', async ({ page }) => {
    await page.goto('/contact');
    const budget = page.getByLabel('Estimated budget range');

    await expect(budget.getByRole('option', { name: 'Select a range (INR)' })).toHaveCount(1);
    await expect(budget.getByRole('option', { name: '₹10,000–₹25,000' })).toHaveCount(1);
    await expect(budget.getByRole('option', { name: 'Custom range' })).toHaveCount(1);
    await budget.selectOption('custom');
    await expect(page.getByRole('group', { name: 'Custom budget range (INR)' })).toBeVisible();
  });
});
