'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MetricsBanner from '@/components/MetricsBanner';
import ProjectStore from '@/components/ProjectStore';
import CustomServices from '@/components/CustomServices';
import Footer from '@/components/Footer';
import DemoModal from '@/components/DemoModal';
import InquiryModal from '@/components/InquiryModal';
import LoginScreen from '@/components/LoginScreen';
import ProfileModal from '@/components/ProfileModal';
import SmoothScroll from '@/components/SmoothScroll';

export default function HomePage() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [demoProject, setDemoProject] = useState(null);
  const [inquiryConfig, setInquiryConfig] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // 1. Auth State Management
  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setShowLogin(false); // Close login screen automatically once authenticated
      }
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Fetch real products from Supabase. RLS allows anyone (logged in or not)
  // to read active products, so this runs once on mount regardless of session.
  useEffect(() => {
    const fetchProducts = async () => {
      setProductsLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const mapped = (data || []).map((p) => {
          const normalizedTech = (p.tech_stack || []).map(s => String(s).toLowerCase());
          let category = p.category || 'Custom Application';

          const nameLower = (p.name || '').toLowerCase();
          let demoUrl = p.demo_url || null;
          if (!demoUrl) {
            if (nameLower.includes('buildinbyte') || nameLower.includes('aurelia')) demoUrl = '/templates/buildinbyte-luxury-hotel/index.html';
            else if (nameLower.includes('luxury hotel') || nameLower.includes('hotel')) demoUrl = '/templates/luxury-hotel/index.html';
            else if (nameLower.includes('real estate') || nameLower.includes('property')) demoUrl = '/templates/real-estate/index.html';
            else if (nameLower.includes('elecstore') || nameLower.includes('electronics')) demoUrl = '/templates/elecstore/index.html';
            else if (nameLower.includes('kanchi')) demoUrl = '/templates/kanchimarket/index.html';
            else if (nameLower.includes('scsvmv') || nameLower.includes('university') || nameLower.includes('school')) demoUrl = '/templates/scsvmv/index.html';
          }

          return {
            id: p.id,
            title: p.name,
            desc: p.description,
            priceUsd: p.price_usd,
            stack: p.tech_stack || [],
            category,
            industry: p.category || 'Business',
            status: 'Ready to Customize',
            demoUrl,
          };
        });

        setProducts(mapped);
      } catch (err) {
        console.error('Error fetching Supabase products:', err);
        setProducts([]);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Auth gate wrapper for action conversions
  const handleInquiryRequest = (config) => {
    if (!session) {
      setShowLogin(true); // Gated transition: open login panel
    } else {
      setInquiryConfig(config); // Authorised transition: open submission form
    }
  };

  // Auth Loading State
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brutal-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-brutal-black bg-brutal-yellow animate-spin"></div>
          <span className="text-xl font-bold text-brutal-black uppercase tracking-widest font-display">
            LOADING
          </span>
        </div>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-brutal-bg text-brutal-black font-sans antialiased selection:bg-brutal-yellow selection:text-brutal-black">
        
        {/* Header (Pass session state and trigger callbacks) */}
        <Navbar 
          session={session} 
          onOpenLogin={() => setShowLogin(true)} 
          onOpenProfile={() => setShowProfile(true)}
          onOpenInquiry={handleInquiryRequest} 
        />

        {/* Hero Section */}
        <Hero
          onOpenDemo={setDemoProject}
          onOpenInquiry={handleInquiryRequest}
        />

        {/* Social Proof Live Metrics Banner */}
        <MetricsBanner />

        {/* Software Inventory Grid */}
        <ProjectStore
          customProjects={products}
          loading={productsLoading}
          onOpenDemo={setDemoProject}
          onOpenInquiry={handleInquiryRequest}
        />

        {/* Custom Services & Student Collective Model */}
        <CustomServices
          onOpenInquiry={handleInquiryRequest}
        />

        {/* Footer */}
        <Footer />

        {/* Modals */}
        {demoProject && (
          <DemoModal
            project={demoProject}
            onClose={() => setDemoProject(null)}
            onOpenInquiry={handleInquiryRequest}
          />
        )}

        {inquiryConfig && (
          <InquiryModal
            config={inquiryConfig}
            onClose={() => setInquiryConfig(null)}
          />
        )}

        {/* Overlay Login Panel */}
        {showLogin && (
          <LoginScreen 
            onClose={() => setShowLogin(false)} 
          />
        )}

        {/* User Profile Modal */}
        {showProfile && (
          <ProfileModal
            user={session?.user}
            onClose={() => setShowProfile(false)}
          />
        )}

      </div>
    </SmoothScroll>
  );
}
