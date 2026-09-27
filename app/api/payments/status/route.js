import { getProductPaymentStatus } from '@/lib/payflow/gateway';
import { jsonError, jsonSuccess } from '@/lib/security/response';
import { errorLog } from '@/lib/security/logger';

export async function GET(request) {
  const paymentId = new URL(request.url).searchParams.get('paymentId') || '';
  try {
    const status = await getProductPaymentStatus(paymentId);
    return jsonSuccess(status, 200, { 'Cache-Control': 'no-store' });
  } catch (error) {
    const responseStatus = Number.isInteger(error.status) && error.status >= 400 && error.status < 500 ? error.status : 502;
    errorLog('Payflow status lookup failed', { paymentId, code: error.code, message: error.message });
    return jsonError(responseStatus === 502 ? 'Unable to confirm the payment right now.' : error.message, responseStatus, null, { 'Cache-Control': 'no-store' });
  }
}
