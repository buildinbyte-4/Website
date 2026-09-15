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

export async function parseJsonBody(request, schema) {
  let body;

  try {
    body = await request.json();
  } catch (error) {
    throw new ApiError('Invalid JSON body', 400);
  }

  const validation = schema.safeParse(body);
  if (!validation.success) {
    throw new ApiError('Invalid request payload', 422, validation.error.flatten());
  }

  return validation.data;
}
