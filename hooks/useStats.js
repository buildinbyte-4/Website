'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useStats() {
  const [stats, setStats] = useState({
    projects_completed: 30,
    clients_served: 20,
    industries_served: 8,
    success_rate: 99,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function fetchStats() {
      try {
        setLoading(true);
        setError(null);

        if (!supabase) {
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('company_stats')
          .select(
            `
            projects_completed,
            clients_served,
            industries_served,
            success_rate
          `
          )
          .limit(1)
          .maybeSingle();

        if (error) throw error;

        if (active && data) {
          setStats(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load stats.');
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
