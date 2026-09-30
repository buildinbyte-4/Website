import 'server-only';

import { createAdminSupabaseClient } from '@/lib/supabase/admin';

function unwrap(result) {
  if (result.error) throw result.error;
  return result.data;
}

export function createPaymentRepository(client = createAdminSupabaseClient()) {
  return {
    async findByIdempotencyKey(idempotencyKey) {
      return unwrap(await client.from('payment_orders').select('*').eq('idempotency_key', idempotencyKey).maybeSingle());
    },
    async reserve(input) {
      return unwrap(await client.from('payment_orders').insert({
        idempotency_key: input.idempotencyKey,
        product_sku: input.sku,
        customer_email: input.email,
        customer_name: input.name,
        user_id: input.userId || null,
        country_code: input.countryCode,
        expected_amount: input.amount,
        currency: input.currency,
        status: 'creating',
      }).select().single());
    },
    async attachProviderOrder(id, providerOrderId) {
      return unwrap(await client.from('payment_orders').update({ razorpay_order_id: providerOrderId, status: 'pending' }).eq('id', id).eq('status', 'creating').select().single());
    },
    async markCreationFailed(id) {
      unwrap(await client.from('payment_orders').update({ status: 'failed' }).eq('id', id).eq('status', 'creating'));
    },
    async findByOrderId(orderId) {
      return unwrap(await client.from('payment_orders').select('*').eq('razorpay_order_id', orderId).maybeSingle());
    },
    async findByPaymentId(paymentId) {
      return unwrap(await client.from('payment_orders').select('*').eq('razorpay_payment_id', paymentId).maybeSingle());
    },
    async markPaid(id, paymentId) {
      return unwrap(await client.from('payment_orders').update({ status: 'paid', razorpay_payment_id: paymentId, paid_at: new Date().toISOString() }).eq('id', id).neq('status', 'refunded').select().single());
    },
    async markFailed(id, paymentId = null) {
      return unwrap(await client.from('payment_orders').update({ status: 'failed', ...(paymentId ? { razorpay_payment_id: paymentId } : {}) }).eq('id', id).not('status', 'in', '(paid,refunded)').select().maybeSingle());
    },
    async markRefunded(id) {
      return unwrap(await client.from('payment_orders').update({ status: 'refunded', fulfillment_status: 'locked', refunded_at: new Date().toISOString() }).eq('id', id).select().single());
    },
    async beginWebhook(eventId, eventType) {
      const result = await client.from('payment_webhook_events').insert({ event_id: eventId, event_type: eventType });
      if (result.error?.code === '23505') {
        const existing = unwrap(await client.from('payment_webhook_events').select('processed_at, processing_error').eq('event_id', eventId).single());
        if (!existing.processing_error) return false;
        unwrap(await client.from('payment_webhook_events').update({ processing_error: null, processed_at: null }).eq('event_id', eventId));
        return true;
      }
      unwrap(result);
      return true;
    },
    async finishWebhook(eventId, processingError = null) {
      unwrap(await client.from('payment_webhook_events').update({ processed_at: new Date().toISOString(), processing_error: processingError }).eq('event_id', eventId));
    },
  };
}
