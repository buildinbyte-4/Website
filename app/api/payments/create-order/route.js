import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { createIdempotentOrder } from '@/lib/payments/order-service.mjs';
import { countryFromTimeZone, detectRequestCountry, resolveProductOffer } from '@/lib/payments/pricing.mjs';
import { getRazorpayClient, getRazorpayPublicKey } from '@/lib/payments/razorpay-server';
import { createPaymentRepository } from '@/lib/payments/repository';
import { ApiError, jsonError, jsonSuccess } from '@/lib/security/response';
import { errorLog } from '@/lib/security/logger';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { parseJsonBody } from '@/lib/validation/schemas';

export const runtime = 'nodejs';

const schema = z.object({
  sku: z.string().trim().min(2).max(100), name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320), countryCode: z.string().trim().length(2).optional(),
}).strict();

async function getOptionalUserId() {
  try {
    const { data } = await (await createServerSupabaseClient()).auth.getUser();
    return data.user?.id || null;
  } catch { return null; }
}

export async function POST(request) {
  try {
    const input = await parseJsonBody(request, schema);
    const suppliedKey = request.headers.get('idempotency-key');
    const idempotencyKey = z.string().uuid().safeParse(suppliedKey).success ? suppliedKey : randomUUID();
    const localCountry = process.env.NODE_ENV === 'development' ? countryFromTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone) : '';
    const countryCode = detectRequestCountry(request, input.countryCode, localCountry);
    let offer;
    try { offer = resolveProductOffer(input.sku, countryCode); }
    catch { return jsonError('This product is not available for checkout.', 404); }
    if (offer.testOnly && !String(process.env.RAZORPAY_KEY_ID || '').startsWith('rzp_test_')) {
      return jsonError('The checkout test product is available only with Razorpay Test Mode credentials.', 403);
    }

    const razorpay = getRazorpayClient();
    const result = await createIdempotentOrder({
      input: { ...input, email: input.email.toLowerCase(), idempotencyKey, countryCode, userId: await getOptionalUserId() },
      offer,
      repository: createPaymentRepository(),
      gateway: { createOrder: (options) => razorpay.orders.create(options) },
    });
    return jsonSuccess({
      orderId: result.record.razorpay_order_id, keyId: getRazorpayPublicKey(),
      amount: result.record.expected_amount, currency: result.record.currency,
      product: { sku: offer.sku, name: offer.name, displayPrice: offer.displayPrice },
      customer: { name: input.name, email: input.email },
      preferredMethod: countryCode === 'IN' ? 'upi' : undefined,
    }, result.created ? 201 : 200);
  } catch (error) {
    if (error instanceof ApiError) return jsonError(error.message, error.status, error.details);
    const status = error.status || (error.code === '23505' ? 409 : 502);
    errorLog('Razorpay order creation failed', { code: error.code, status });
    return jsonError(status === 409 ? 'This checkout request is already being processed.' : 'Payment checkout is temporarily unavailable.', status);
  }
}
