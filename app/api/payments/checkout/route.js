import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { createProductPayment } from '@/lib/payflow/gateway';
import { PAYFLOW_PRODUCT } from '@/lib/payflow/product';
import { ApiError, jsonError, jsonSuccess } from '@/lib/security/response';
import { errorLog } from '@/lib/security/logger';
import { parseJsonBody } from '@/lib/validation/schemas';

const checkoutSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320),
  acceptedTerms: z.literal(true),
}).strict();

export async function POST(request) {
  try {
    const customer = await parseJsonBody(request, checkoutSchema);
    const suppliedKey = request.headers.get('idempotency-key');
    const idempotencyKey = suppliedKey && z.string().uuid().safeParse(suppliedKey).success ? suppliedKey : randomUUID();
    const payment = await createProductPayment({
      customer: { name: customer.name, email: customer.email },
      idempotencyKey,
    });
    return jsonSuccess({
      paymentId: payment.paymentId,
      checkoutUrl: payment.checkoutUrl,
      status: payment.status,
      product: { sku: PAYFLOW_PRODUCT.sku, name: PAYFLOW_PRODUCT.name, displayPrice: PAYFLOW_PRODUCT.displayPrice },
    }, 201);
  } catch (error) {
    if (error instanceof ApiError) return jsonError(error.message, error.status, error.details);
    const status = Number.isInteger(error.status) && error.status >= 400 && error.status < 500 ? error.status : 502;
    errorLog('Payflow checkout creation failed', { code: error.code, message: error.message });
    return jsonError(status === 502 ? 'Payment checkout is temporarily unavailable.' : error.message, status);
  }
}
