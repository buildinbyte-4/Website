'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useFAQ() {
  const [faq, setFaq] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function fetchFaq() {
      try {
        setLoading(true);
        setError(null);

        if (!supabase) {
          throw new Error('Supabase client is unavailable.');
        }

        const { data, error } = await supabase.from('faq').select('*').order('display_order', { ascending: true, nullsFirst: false });

        if (error) throw error;

        if (active) {
          setFaq(data || []);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load FAQ.');
          setFaq([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchFaq();

    return () => {
      active = false;
    };
  }, []);

  return { faq, loading, error };
}
