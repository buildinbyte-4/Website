import { z } from 'zod';
import { ApiError } from '@/lib/security/response';

export const loginSchema = z.object({
  username: z.string().trim().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
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
