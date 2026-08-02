'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';

const getCategoryFromTech = (techStack = []) => {
  const normalized = techStack.map((item) => String(item).toLowerCase());

  if (normalized.some((value) => value.includes('dashboard') || value.includes('analytics'))) {
    return 'Dashboard';
  }

  if (normalized.some((value) => value.includes('ecommerce') || value.includes('shop') || value.includes('commerce'))) {
    return 'E-Commerce';
  }

  if (normalized.some((value) => value.includes('ai') || value.includes('gpt') || value.includes('llm') || value.includes('ml'))) {
    return 'AI Solutions';
  }

  if (normalized.some((value) => value.includes('erp') || value.includes('crm') || value.includes('management') || value.includes('workflow'))) {
    return 'Enterprise Software';
  }

  if (normalized.some((value) => value.includes('inventory') || value.includes('attendance') || value.includes('queue') || value.includes('employee'))) {
    return 'Internal Management System';
  }

  if (normalized.some((value) => value.includes('website') || value.includes('web'))) {
    return 'Business Website';
  }

  return 'Custom Application';
};

const getDemoUrl = (product) => {
  if (product.demo_url || product.demoUrl || product.url) {
    return product.demo_url || product.demoUrl || product.url;
  }

  const nameLower = (product.name || '').toLowerCase();
  if (nameLower.includes('buildinbyte') || nameLower.includes('aurelia')) return '/templates/buildinbyte-luxury-hotel/index.html';
  if (nameLower.includes('luxury hotel') || nameLower.includes('hotel')) return '/templates/luxury-hotel/index.html';
  if (nameLower.includes('real estate') || nameLower.includes('property')) return '/templates/real-estate/index.html';
  if (nameLower.includes('elecstore') || nameLower.includes('electronics')) return '/templates/elecstore/index.html';
  if (nameLower.includes('kanchi')) return '/templates/kanchimarket/index.html';
  if (nameLower.includes('scsvmv') || nameLower.includes('university') || nameLower.includes('school')) return '/templates/scsvmv/index.html';
  return null;
};

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        if (!supabase) {
          throw new Error('Supabase client is unavailable.');
        }

        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (!active) return;

        const mapped = (data || []).map((product) => ({
          id: product.id,
          title: product.name,
          desc: product.short_description || product.description || '',
          stack: Array.isArray(product.tech_stack) ? product.tech_stack : [],
          category: getCategoryFromTech(Array.isArray(product.tech_stack) ? product.tech_stack : []),
          industry: product.category || 'Business',
          status: product.status || 'Ready to Customize',
          demoUrl: getDemoUrl(product),
          thumbnail: product.thumbnail || null,
          gallery: product.gallery || [],
          features: product.features || [],
          priceUsd: product.price_usd,
        }));

        setProducts(mapped);
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load products.');
          setProducts([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      active = false;
    };
  }, []);

  const featuredProducts = useMemo(() => products.filter((product) => product?.title), [products]);

  return { products, featuredProducts, loading, error };
}
