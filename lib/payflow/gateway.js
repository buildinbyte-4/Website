import 'server-only';

import { createHmac, timingSafeEqual } from 'node:crypto';
import { PAYFLOW_PRODUCT } from '@/lib/payflow/product';

const PAYMENT_ID_PATTERN = /^pay_[A-Za-z0-9_-]{8,200}$/;

function requiredEnvironment(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function gatewayConfiguration() {
  const apiUrl = new URL(requiredEnvironment('PAYFLOW_API_URL'));
  if (process.env.NODE_ENV === 'production' && apiUrl.protocol !== 'https:') {
    throw new Error('PAYFLOW_API_URL must use HTTPS in production.');
  }
  return { apiUrl: apiUrl.toString().replace(/\/$/, ''), apiKey: requiredEnvironment('PAYFLOW_API_KEY') };
}

function publicApplicationUrl() {
  const url = new URL(process.env.PAYFLOW_APP_URL || requiredEnvironment('NEXT_PUBLIC_APP_URL'));
  if (process.env.NODE_ENV === 'production' && url.protocol !== 'https:') {
    throw new Error('PAYFLOW_APP_URL must use HTTPS in production.');
  }
  return url;
}

async function gatewayRequest(path, init = {}) {
  const { apiUrl, apiKey } = gatewayConfiguration();
  const response = await fetch(`${apiUrl}${path}`, {
    ...init,
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
    headers: { Accept: 'application/json', Authorization: `Bearer ${apiKey}`, ...init.headers },
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(payload?.error?.message || `Payflow returned HTTP ${response.status}.`);
    error.status = response.status;
    error.code = payload?.error?.code || 'PAYFLOW_REQUEST_FAILED';
    throw error;
  }
  return payload;
}

export function isValidPaymentId(paymentId) {
  return PAYMENT_ID_PATTERN.test(paymentId);
}

export async function createProductPayment({ customer, idempotencyKey, offer }) {
  const referenceId = `BIB-PAYFLOW-${idempotencyKey}`;
  const appUrl = publicApplicationUrl();
  const returnUrl = new URL('/checkout/result', appUrl);
  returnUrl.searchParams.set('reference', referenceId);
  const webhookUrl = new URL('/api/payments/webhook', appUrl);

  return gatewayRequest('/payments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
    body: JSON.stringify({
      amount: offer.amountMinor,
      currency: offer.currency,
      referenceId,
      merchantOrderId: referenceId,
      referenceLabel: 'Order reference',
      description: PAYFLOW_PRODUCT.name,
      customer,
      returnUrl: returnUrl.toString(),
      webhookUrl: webhookUrl.toString(),
      paymentMethods: offer.paymentMethods,
    }),
  });
}

export async function getProductPaymentStatus(paymentId) {
  if (!isValidPaymentId(paymentId)) {
    const error = new Error('Invalid payment ID.');
    error.status = 422;
    throw error;
  }
  return gatewayRequest(`/merchant/payments/${encodeURIComponent(paymentId)}/status`);
}

export function verifyPayflowWebhook({ rawBody, signature, timestamp, now = Date.now() }) {
  const secret = requiredEnvironment('PAYFLOW_WEBHOOK_SECRET');
  const timestampNumber = Number(timestamp);
  if (!Number.isFinite(timestampNumber) || Math.abs(now / 1000 - timestampNumber) > 300) return false;
  const supplied = String(signature || '').replace(/^sha256=/, '');
  if (!/^[a-f0-9]{64}$/i.test(supplied)) return false;
  const expected = Buffer.from(createHmac('sha256', secret).update(`${timestamp}.${rawBody}`).digest('hex'), 'hex');
  const received = Buffer.from(supplied, 'hex');
  return received.length === expected.length && timingSafeEqual(received, expected);
}
