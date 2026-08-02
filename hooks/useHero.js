'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useHero() {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function fetchHero() {
      try {
        setLoading(true);
        setError(null);

        if (!supabase) {
          throw new Error('Supabase client is unavailable.');
        }

        const { data, error } = await supabase.from('hero_section').select('*').limit(1).single();

        if (error) throw error;

        if (active) {
          setHero(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load hero content.');
          setHero(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchHero();

    return () => {
      active = false;
    };
  }, []);

  return { hero, loading, error };
}
