import { ApiError, jsonError, jsonSuccess } from '@/lib/security/response';
import { errorLog } from '@/lib/security/logger';
import { idempotencyKeySchema, inquirySchema, parseJsonBody } from '@/lib/validation/schemas';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { randomUUID } from 'node:crypto';

export async function POST(request) {
  try {
    const payload = await parseJsonBody(request, inquirySchema);
    const supabase = await createServerSupabaseClient();
    const { data: authData, error: authError } = await supabase.auth.getClaims();
    const userId = authData?.claims?.sub;

    if (authError || !userId) {
      return jsonError('Please sign in before submitting an inquiry.', 401);
    }

    const suppliedKey = request.headers.get('idempotency-key');
    const parsedKey = suppliedKey ? idempotencyKeySchema.safeParse(suppliedKey) : null;
    if (parsedKey && !parsedKey.success) {
      throw new ApiError('Invalid Idempotency-Key header', 422);
    }
    const requestId = parsedKey?.data || randomUUID();

    const message = payload.company
      ? `Company: ${payload.company}\n\n${payload.scope}`
      : payload.scope;

    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        id: requestId,
        user_id: userId,
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
