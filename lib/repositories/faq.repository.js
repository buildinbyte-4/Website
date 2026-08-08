import { getSupabaseClient } from '@/lib/repositories/base.repository';

export async function listFaqEntries() {
  const client = getSupabaseClient();
  const { data, error } = await client.from('faq').select('*').order('created_at', { ascending: true });
  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}
