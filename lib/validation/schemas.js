import { z } from 'zod';
import { ApiError } from '@/lib/security/response';

export const loginSchema = z.object({
  email: z.string().trim().email('A valid email is required').max(320),
  password: z.string().min(8, 'Password must be at least 8 characters').max(256),
}).strict();

export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320),
  company: z.string().trim().max(160).optional().default(''),
  scope: z.string().trim().min(10).max(5000),
  projectType: z.string().trim().min(2).max(200),
}).strict();

export const clientErrorSchema = z.object({
  message: z.string().trim().min(1).max(500),
  digest: z.string().trim().max(200).optional(),
  path: z.string().trim().max(500).optional(),
}).strict();

export const idempotencyKeySchema = z.string().uuid();

async function readBodyWithinLimits(request, maxBytes, timeoutMs) {
  const contentLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    throw new ApiError('Request body is too large', 413);
  }

  if (!request.body) return '';

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let receivedBytes = 0;
  let timer;

  const readBody = async () => {
    let body = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      receivedBytes += value.byteLength;
      if (receivedBytes > maxBytes) {
        throw new ApiError('Request body is too large', 413);
      }
      body += decoder.decode(value, { stream: true });
    }
    return body + decoder.decode();
  };

  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => {
      reader.cancel().catch(() => {});
      reject(new ApiError('Request body timed out', 408));
    }, timeoutMs);
  });

  try {
    return await Promise.race([readBody(), timeout]);
  } finally {
    clearTimeout(timer);
  }
}

export async function parseJsonBody(request, schema, { maxBytes = 16_384, timeoutMs = 5_000 } = {}) {
  let rawBody;

  try {
    rawBody = await readBodyWithinLimits(request, maxBytes, timeoutMs);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Unable to read request body', 400);
  }

  let body;
  try {
    body = JSON.parse(rawBody);
  } catch {
    throw new ApiError('Invalid JSON body', 400);
  }

  const validation = schema.safeParse(body);
  if (!validation.success) {
    throw new ApiError('Invalid request payload', 422, validation.error.flatten());
  }

  return validation.data;
}
