import test from 'node:test';
import assert from 'node:assert/strict';
import { createIdempotentOrder } from '../../lib/payments/order-service.mjs';

function harness() {
  let row;
  let providerCalls = 0;
  const repository = {
    findByIdempotencyKey: async () => row,
    reserve: async (input) => (row = { id: 'd78c6336-d167-4a60-bcf2-cb6b5bb3ba32', product_sku: input.sku, customer_email: input.email, expected_amount: input.amount, currency: input.currency }),
    attachProviderOrder: async (_id, orderId) => (row = { ...row, razorpay_order_id: orderId, status: 'pending' }),
    markCreationFailed: async () => {},
  };
  const gateway = { createOrder: async (options) => { providerCalls += 1; assert.equal(options.amount, 200); return { id: 'order_test' }; } };
  return { repository, gateway, calls: () => providerCalls };
}

test('creates a server-priced Razorpay order', async () => {
  const h = harness();
  const result = await createIdempotentOrder({ input: { idempotencyKey: 'key', sku: 'sku', email: 'buyer@example.com' }, offer: { amount: 200, currency: 'INR' }, repository: h.repository, gateway: h.gateway });
  assert.equal(result.record.razorpay_order_id, 'order_test');
  assert.equal(h.calls(), 1);
});

test('returns the same order for a duplicate idempotent request', async () => {
  const h = harness();
  const args = { input: { idempotencyKey: 'key', sku: 'sku', email: 'buyer@example.com' }, offer: { amount: 200, currency: 'INR' }, repository: h.repository, gateway: h.gateway };
  await createIdempotentOrder(args);
  const duplicate = await createIdempotentOrder(args);
  assert.equal(duplicate.created, false);
  assert.equal(duplicate.record.razorpay_order_id, 'order_test');
  assert.equal(h.calls(), 1);
});
