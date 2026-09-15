import { redirect } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;

  if (error || !userId) {
    redirect('/?login=1');
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .maybeSingle();

  if (profileError || profile?.role !== 'admin') {
    redirect('/');
  }

  return <AdminShell>{children}</AdminShell>;
}
