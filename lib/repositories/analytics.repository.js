import { getSupabaseClient } from '@/lib/repositories/base.repository';

export async function getAnalyticsSnapshot() {
  const client = getSupabaseClient();
  const { data, error } = await client.from('analytics_summary').select('*').maybeSingle();
  if (error) {
    throw new Error(error.message);
  }

  return data || {
    total_orders: 0,
    total_revenue: 0,
    active_users: 0,
  };
}
