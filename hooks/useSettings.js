'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function fetchSettings() {
      try {
        setLoading(true);
        setError(null);

        if (!supabase) {
          throw new Error('Supabase client is unavailable.');
        }

        const { data, error } = await supabase.from('site_settings').select('*').limit(1).maybeSingle();

        if (error) throw error;

        if (active) {
          setSettings(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load site settings.');
          setSettings(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchSettings();

    const channel = supabase
      ?.channel('live-site-settings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, fetchSettings)
      .subscribe();

    return () => {
      active = false;
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  return { settings, loading, error };
}
