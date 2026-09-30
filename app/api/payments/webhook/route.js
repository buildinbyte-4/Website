import { verifyWebhookSignature } from '@/lib/payments/signatures.mjs';
import { createPaymentRepository } from '@/lib/payments/repository';
import { jsonError, jsonSuccess } from '@/lib/security/response';
import { errorLog, securityLog } from '@/lib/security/logger';

export const runtime = 'nodejs';

async function reconcile(event, repository) {
  const payment = event?.payload?.payment?.entity;
  const refund = event?.payload?.refund?.entity;
  if (['payment.captured', 'order.paid'].includes(event.event)) {
    const record = await repository.findByOrderId(payment?.order_id);
    if (!record) return;
    if (Number(payment.amount) !== record.expected_amount || String(payment.currency).toUpperCase() !== record.currency) throw new Error('WEBHOOK_PAYMENT_MISMATCH');
    await repository.markPaid(record.id, payment.id);
  } else if (event.event === 'payment.failed') {
    const record = await repository.findByOrderId(payment?.order_id);
    if (record) await repository.markFailed(record.id, payment.id);
  } else if (['payment.refunded', 'refund.processed'].includes(event.event)) {
    const record = await repository.findByPaymentId(payment?.id || refund?.payment_id);
    if (record) await repository.markRefunded(record.id);
  }
}

export async function POST(request) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-razorpay-signature') || '';
  const eventId = request.headers.get('x-razorpay-event-id') || '';
  if (!eventId || !verifyWebhookSignature({ rawBody, signature, secret: process.env.RAZORPAY_WEBHOOK_SECRET || '' })) {
    securityLog('Rejected unsigned Razorpay webhook', { hasEventId: Boolean(eventId) });
    return jsonError('Invalid webhook signature.', 401);
  }
  let event;
  try { event = JSON.parse(rawBody); }
  catch { return jsonError('Invalid webhook payload.', 400); }

  const repository = createPaymentRepository();
  try {
    if (!await repository.beginWebhook(eventId, String(event.event || 'unknown'))) return jsonSuccess({ accepted: true, duplicate: true });
    await reconcile(event, repository);
    await repository.finishWebhook(eventId);
    return jsonSuccess({ accepted: true });
  } catch (error) {
    await repository.finishWebhook(eventId, String(error.message).slice(0, 500)).catch(() => {});
    errorLog('Razorpay webhook reconciliation failed', { eventId, code: error.code });
    return jsonError('Webhook processing failed.', 500);
  }
}
