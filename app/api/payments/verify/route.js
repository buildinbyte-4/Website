import { z } from 'zod';
import { verifyPaymentSignature } from '@/lib/payments/signatures.mjs';
import { getRazorpayClient } from '@/lib/payments/razorpay-server';
import { createPaymentRepository } from '@/lib/payments/repository';
import { ApiError, jsonError, jsonSuccess } from '@/lib/security/response';
import { errorLog, securityLog } from '@/lib/security/logger';
import { parseJsonBody } from '@/lib/validation/schemas';

export const runtime = 'nodejs';
const schema = z.object({
  razorpay_order_id: z.string().trim().startsWith('order_').max(100),
  razorpay_payment_id: z.string().trim().startsWith('pay_').max(100),
  razorpay_signature: z.string().trim().regex(/^[a-f\d]{64}$/i),
}).strict();

export async function POST(request) {
  try {
    const payload = await parseJsonBody(request, schema);
    if (!verifyPaymentSignature({ orderId: payload.razorpay_order_id, paymentId: payload.razorpay_payment_id, signature: payload.razorpay_signature, secret: process.env.RAZORPAY_KEY_SECRET || '' })) {
      securityLog('Rejected invalid Razorpay payment signature', { orderId: payload.razorpay_order_id });
      return jsonError('Payment signature verification failed.', 401);
    }
    const repository = createPaymentRepository();
    const record = await repository.findByOrderId(payload.razorpay_order_id);
    if (!record) return jsonError('Payment order was not found.', 404);
    const payment = await getRazorpayClient().payments.fetch(payload.razorpay_payment_id);
    if (payment.order_id !== record.razorpay_order_id || Number(payment.amount) !== record.expected_amount || String(payment.currency).toUpperCase() !== record.currency) {
      securityLog('Razorpay payment did not match the expected order', { orderId: record.razorpay_order_id });
      return jsonError('Payment details did not match the order.', 409);
    }
    if (payment.status !== 'captured') return jsonSuccess({ status: 'pending', message: 'Payment received and awaiting capture.' }, 202);
    await repository.markPaid(record.id, payload.razorpay_payment_id);
    return jsonSuccess({ status: 'paid', message: 'Payment verified.', fulfillment: 'locked' });
  } catch (error) {
    if (error instanceof ApiError) return jsonError(error.message, error.status, error.details);
    errorLog('Razorpay payment verification failed', { code: error.code });
    return jsonError('Payment verification is temporarily unavailable.', 502);
  }
}
