import { ApiError, jsonError, jsonSuccess } from '@/lib/security/response';
import { errorLog } from '@/lib/security/logger';
import { idempotencyKeySchema, inquirySchema, parseJsonBody } from '@/lib/validation/schemas';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getTrustedClientIp } from '@/lib/security/client-ip';
import { checkInquiryRateLimit } from '@/lib/security/rate-limiter';
import { randomUUID } from 'node:crypto';

export async function POST(request) {
  try {
    const payload = await parseJsonBody(request, inquirySchema);
    if (payload.website) {
      return jsonSuccess({ received: true });
    }

    const clientIp = getTrustedClientIp(request);
    if (!checkInquiryRateLimit(`inquiry:${clientIp}`)) {
      return jsonError('Too many inquiries. Please try again later.', 429, null, { 'Retry-After': '3600' });
    }

    const supabase = await createServerSupabaseClient();
    const { data: authData } = await supabase.auth.getClaims();
    const userId = authData?.claims?.sub;

    const suppliedKey = request.headers.get('idempotency-key');
    const parsedKey = suppliedKey ? idempotencyKeySchema.safeParse(suppliedKey) : null;
    if (parsedKey && !parsedKey.success) {
      throw new ApiError('Invalid Idempotency-Key header', 422);
    }
    const requestId = parsedKey?.data || randomUUID();

    const context = [
      payload.company && `Company: ${payload.company}`,
      payload.engagement && `Engagement: ${payload.engagement}`,
      payload.budget && `Budget: ${payload.budget}`,
      payload.timeline && `Target start: ${payload.timeline}`,
    ].filter(Boolean);
    const message = [...context, payload.scope].join('\n\n');

    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        id: requestId,
        user_id: userId || null,
        name: payload.name,
        email: payload.email,
        project_type: payload.projectType,
        message,
        status: 'new',
      });

    if (error?.code === '23505') {
      return jsonSuccess({ id: requestId, received: true, duplicate: true });
    }
    if (error?.message?.includes('inquiry_rate_limit_exceeded')) {
      return jsonError('Inquiry limit reached. Please try again later.', 429, null, { 'Retry-After': '3600' });
    }
    if (error) throw error;

    if (process.env.INQUIRY_WEBHOOK_URL) {
      try {
        await fetch(process.env.INQUIRY_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, inquiryId: requestId }),
          signal: AbortSignal.timeout(5000),
        });
      } catch (webhookError) {
        errorLog('Inquiry webhook delivery failed', { inquiryId: requestId, message: webhookError.message });
      }
    }

    return jsonSuccess({ id: requestId, received: true }, 201);
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonError(error.message, error.status, error.details);
    }
    errorLog('Inquiry submission failed', { message: error.message });
    return jsonError('Unable to submit inquiry', 500);
  }
}
