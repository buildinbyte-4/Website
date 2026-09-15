import { getTrustedClientIp } from '@/lib/security/client-ip';
import { errorLog } from '@/lib/security/logger';
import { checkClientErrorRateLimit } from '@/lib/security/rate-limiter';
import { ApiError, jsonError, jsonSuccess } from '@/lib/security/response';
import { clientErrorSchema, parseJsonBody } from '@/lib/validation/schemas';

export async function POST(request) {
  const ip = getTrustedClientIp(request);
  if (!checkClientErrorRateLimit(`client-error:${ip}`)) {
    return jsonError('Too many error reports', 429, null, { 'Retry-After': '60' });
  }

  try {
    const report = await parseJsonBody(request, clientErrorSchema, { maxBytes: 4_096 });
    const event = {
      ...report,
      userAgent: request.headers.get('user-agent')?.slice(0, 300),
      timestamp: new Date().toISOString(),
    };

    errorLog('Unhandled browser error', event);

    if (process.env.ERROR_REPORTING_WEBHOOK_URL) {
      await fetch(process.env.ERROR_REPORTING_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
        signal: AbortSignal.timeout(5_000),
      }).catch((error) => errorLog('Error reporting webhook failed', { message: error.message }));
    }

    return jsonSuccess({ accepted: true }, 202);
  } catch (error) {
    if (error instanceof ApiError) return jsonError(error.message, error.status, error.details);
    return jsonError('Unable to accept error report', 500);
  }
}
