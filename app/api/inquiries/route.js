import { ApiError, jsonError, jsonSuccess } from '@/lib/security/response';
import { errorLog } from '@/lib/security/logger';
import { inquirySchema, parseJsonBody } from '@/lib/validation/schemas';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST(request) {
  try {
    const payload = await parseJsonBody(request, inquirySchema);
    const supabase = await createServerSupabaseClient();
    const { data: authData, error: authError } = await supabase.auth.getClaims();
    const userId = authData?.claims?.sub;

    if (authError || !userId) {
      return jsonError('Please sign in before submitting an inquiry.', 401);
    }

    const message = payload.company
      ? `Company: ${payload.company}\n\n${payload.scope}`
      : payload.scope;

    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        user_id: userId,
        name: payload.name,
        email: payload.email,
        project_type: payload.projectType,
        message,
        status: 'new',
      })
      .select('id, created_at')
      .single();

    if (error) throw error;

    if (process.env.INQUIRY_WEBHOOK_URL) {
      try {
        await fetch(process.env.INQUIRY_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, inquiryId: data.id, createdAt: data.created_at }),
          signal: AbortSignal.timeout(5000),
        });
      } catch (webhookError) {
        errorLog('Inquiry webhook delivery failed', { inquiryId: data.id, message: webhookError.message });
      }
    }

    return jsonSuccess({ id: data.id, received: true }, 201);
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonError(error.message, error.status, error.details);
    }
    errorLog('Inquiry submission failed', { message: error.message });
    return jsonError('Unable to submit inquiry', 500);
  }
}
