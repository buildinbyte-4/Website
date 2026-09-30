import test from 'node:test';
import assert from 'node:assert/strict';
import { checkoutReducer, initialCheckoutState } from '../../lib/payments/checkout-state.mjs';

test('checkout UI exposes loading, cancellation, failure, verification, and success states', () => {
  assert.equal(checkoutReducer(initialCheckoutState, { type: 'loading' }).status, 'loading');
  assert.equal(checkoutReducer(initialCheckoutState, { type: 'cancelled' }).status, 'cancelled');
  assert.equal(checkoutReducer(initialCheckoutState, { type: 'failed', message: 'Network error' }).message, 'Network error');
  assert.equal(checkoutReducer(initialCheckoutState, { type: 'verifying' }).status, 'verifying');
  assert.equal(checkoutReducer(initialCheckoutState, { type: 'success' }).status, 'success');
});
