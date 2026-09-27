import { z } from 'zod';
import { getProductPaymentStatus, verifyPayflowWebhook } from '@/lib/payflow/gateway';
import { errorLog } from '@/lib/security/logger';
import { jsonError } from '@/lib/security/response';
import { PAYFLOW_PRODUCT } from '@/lib/payflow/product';

const eventSchema = z.object({
  eventId: z.string().min(1).max(200),
  event: z.string().startsWith('payment.'),
  paymentId: z.string().startsWith('pay_'),
  referenceId: z.string().startsWith('BIB-PAYFLOW-'),
  transactionId: z.string().optional(),
  status: z.enum(['CREATED', 'PROCESSING', 'SUCCESS', 'FAILED', 'PENDING', 'CANCELLED', 'REFUND_PENDING', 'PARTIALLY_REFUNDED', 'REFUNDED']),
  amount: z.number().int().positive(),
  currency: z.string().length(3),
  createdAt: z.string().optional(),
}).passthrough();

export async function POST(request) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-payment-gateway-signature');
  const timestamp = request.headers.get('x-payment-gateway-timestamp');
  try {
    if (!verifyPayflowWebhook({ rawBody, signature, timestamp })) return jsonError('Invalid webhook signature.', 401);
    const parsed = eventSchema.safeParse(JSON.parse(rawBody));
    if (!parsed.success) return jsonError('Invalid webhook event.', 422);
    const event = parsed.data;
    if (event.amount !== PAYFLOW_PRODUCT.amountMinor || event.currency !== PAYFLOW_PRODUCT.currency) {
      return jsonError('Webhook amount or currency does not match the product.', 409);
    }
    const authoritative = await getProductPaymentStatus(event.paymentId);
    if (String(authoritative.status).toUpperCase() !== event.status) {
      return jsonError('Webhook status did not match the gateway.', 409);
    }
    console.info(JSON.stringify({
      level: 'info', code: 'PAYFLOW_WEBHOOK_ACCEPTED', eventId: event.eventId,
      paymentId: event.paymentId, referenceId: event.referenceId, status: event.status,
    }));
    return new Response(null, { status: 204 });
  } catch (error) {
    errorLog('Payflow webhook processing failed', { message: error.message });
    return jsonError('Unable to process webhook.', 500);
  }
}
