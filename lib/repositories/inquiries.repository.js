import { getSupabaseClient } from '@/lib/repositories/base.repository';

export async function createInquiry(payload) {
  const client = getSupabaseClient();
  const { data, error } = await client.from('inquiries').insert(payload).select('*').single();
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function listInquiries() {
  const client = getSupabaseClient();
  const { data, error } = await client.from('inquiries').select('*').order('created_at', { ascending: false });
  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}
