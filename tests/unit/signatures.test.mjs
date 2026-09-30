import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { verifyPaymentSignature, verifyWebhookSignature } from '../../lib/payments/signatures.mjs';

test('accepts a valid payment signature and rejects an invalid one', () => {
  const secret = 'test_secret';
  const signature = createHmac('sha256', secret).update('order_123|pay_123').digest('hex');
  assert.equal(verifyPaymentSignature({ orderId: 'order_123', paymentId: 'pay_123', signature, secret }), true);
  assert.equal(verifyPaymentSignature({ orderId: 'order_123', paymentId: 'pay_123', signature: '0'.repeat(64), secret }), false);
});

test('verifies Razorpay webhooks against the exact raw body', () => {
  const secret = 'webhook_secret';
  const rawBody = '{"event":"payment.captured"}';
  const signature = createHmac('sha256', secret).update(rawBody).digest('hex');
  assert.equal(verifyWebhookSignature({ rawBody, signature, secret }), true);
  assert.equal(verifyWebhookSignature({ rawBody: `${rawBody} `, signature, secret }), false);
});
