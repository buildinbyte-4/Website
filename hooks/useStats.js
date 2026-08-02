'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function fetchStats() {
      try {
        setLoading(true);
        setError(null);

        if (!supabase) {
          throw new Error('Supabase client is unavailable.');
        }

        const { data, error } = await supabase.from('company_stats').select('*').limit(1).single();

        if (error) throw error;

        if (active) {
          setStats(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load stats.');
          setStats(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchStats();

    return () => {
      active = false;
    };
  }, []);

  return { stats, loading, error };
}
