'use client';

import { LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ClientSignOutButton() {
  const handleSignOut = async () => {
    if (supabase) await supabase.auth.signOut();
    window.location.assign('/');
  };

  return (
    <button type="button" onClick={handleSignOut} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-text-secondary hover:bg-accent-soft hover:text-foreground">
      <LogOut size={17} aria-hidden="true" />
      Sign out
    </button>
  );
}
