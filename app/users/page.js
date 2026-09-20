'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import ClientPortal from '@/components/client/ClientPortal';
import ClientAccessPending from '@/components/client/ClientAccessPending';

export default function UsersPage() {
  const [state, setState] = useState({ loading: true, user: null, account: null, projects: [], orders: [] });

  useEffect(() => {
    let active = true;

    const loadPortal = async () => {
      if (!supabase) {
        window.location.replace('/?login=1&next=/users');
        return;
      }

      const [{ data: sessionData }, { data: userData }] = await Promise.all([
        supabase.auth.getSession(),
        supabase.auth.getUser(),
      ]);
      const user = userData.user;

      if (!user || !sessionData.session) {
        window.location.replace('/?login=1&next=/users');
        return;
      }

      const { data: account } = await supabase
        .from('client_accounts')
        .select('company_name, portal_enabled, onboarding_stage, activated_at')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!active) return;
      if (!account?.portal_enabled) {
        setState({ loading: false, user, account: null, projects: [], orders: [] });
        return;
      }

      const [{ data: projects }, { data: orders }] = await Promise.all([
        supabase
          .from('client_projects')
          .select('id, project_code, name, summary, status, progress, next_milestone, target_launch, updated_at, client_project_updates(id, title, summary, created_at)')
          .eq('client_id', user.id)
          .order('updated_at', { ascending: false }),
        supabase
          .from('orders')
          .select('id, status, amount_usd, created_at')
          .eq('buyer_id', user.id)
          .order('created_at', { ascending: false }),
      ]);

      if (!active) return;
      const normalizedProjects = (projects || []).map(project => ({
        ...project,
        client_project_updates: [...(project.client_project_updates || [])]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 1),
      }));

      setState({ loading: false, user, account, projects: normalizedProjects, orders: orders || [] });
    };

    void loadPortal();
    const { data: { subscription } } = supabase?.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') window.location.replace('/');
    }) || { data: { subscription: null } };

    return () => {
      active = false;
      subscription?.unsubscribe();
    };
  }, []);

  if (state.loading) {
    return <main className="flex min-h-screen items-center justify-center bg-canvas text-foreground"><div role="status" className="text-center"><div className="mx-auto h-12 w-12 animate-spin border border-border-subtle bg-accent-soft" /><p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">Opening your workspace</p></div></main>;
  }

  if (!state.account) return <ClientAccessPending email={state.user.email} />;
  return <ClientPortal user={state.user} account={state.account} projects={state.projects} orders={state.orders} />;
}
