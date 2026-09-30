import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveProductOffer, TEST_PRODUCT_SKU, validateRazorpayOffer } from '../../lib/payments/pricing.mjs';

const catalog = { 'real-sku': { active: true, name: 'Real product' } };

test('server resolves India and international pricing from SKU, not browser amount', () => {
  assert.deepEqual(resolveProductOffer('real-sku', 'IN', catalog), {
    active: true, name: 'Real product', sku: 'real-sku', market: 'India', amount: 200, currency: 'INR', displayPrice: '₹2',
  });
  assert.equal(resolveProductOffer('real-sku', 'US', catalog).amount, 2000);
  assert.throws(() => resolveProductOffer('unknown', 'IN', catalog), /PRODUCT_NOT_AVAILABLE/);
});

test('rejects amounts below Razorpay minimum and unsupported currencies', () => {
  assert.throws(() => validateRazorpayOffer({ amount: 99, currency: 'INR' }), /AMOUNT_BELOW/);
  assert.throws(() => validateRazorpayOffer({ amount: 200, currency: 'ZZZ' }), /UNSUPPORTED/);
});

test('keeps the checkout test product at the ₹1 Razorpay minimum', () => {
  const offer = resolveProductOffer(TEST_PRODUCT_SKU, 'US');
  assert.equal(offer.amount, 100);
  assert.equal(offer.currency, 'INR');
  assert.equal(offer.displayPrice, '₹1');
});
