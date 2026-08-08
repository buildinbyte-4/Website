import { getSupabaseClient } from '@/lib/repositories/base.repository';

export async function listProducts({ limit = 20, offset = 0, category = null } = {}) {
  const client = getSupabaseClient();
  let query = client.from('products').select('*').order('created_at', { ascending: false }).range(offset, offset + limit - 1);

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

export async function getProductBySlug(slug) {
  const client = getSupabaseClient();
  const { data, error } = await client.from('products').select('*').eq('slug', slug).maybeSingle();
  if (error) {
    throw new Error(error.message);
  }

  return data;
}
