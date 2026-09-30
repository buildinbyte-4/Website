import { createHmac, timingSafeEqual } from 'node:crypto';

function safeEqualHex(actual, expected) {
  if (!/^[a-f\d]+$/i.test(String(actual || '')) || !/^[a-f\d]+$/i.test(String(expected || ''))) return false;
  const actualBuffer = Buffer.from(actual, 'hex');
  const expectedBuffer = Buffer.from(expected, 'hex');
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

export function verifyPaymentSignature({ orderId, paymentId, signature, secret }) {
  if (!secret) throw new Error('RAZORPAY_SIGNATURE_SECRET_MISSING');
  const expected = createHmac('sha256', secret).update(`${orderId}|${paymentId}`).digest('hex');
  return safeEqualHex(signature, expected);
}

export function verifyWebhookSignature({ rawBody, signature, secret }) {
  if (!secret) throw new Error('RAZORPAY_WEBHOOK_SECRET_MISSING');
  const expected = createHmac('sha256', secret).update(rawBody).digest('hex');
  return safeEqualHex(signature, expected);
}
