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
import { PROJECTS as MOCK_PROJECTS } from '@/lib/data';

export default function HomePage() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [products, setProducts] = useState(MOCK_PROJECTS); // Start with mock projects
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

  // 2. Fetch Products from Supabase on Login / Session Status Change
  useEffect(() => {
    const fetchProducts = async () => {
      // If not logged in, we default to showing MOCK_PROJECTS for public view
      if (!session) {
        setProducts(MOCK_PROJECTS);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('status', 'active');

        if (error) throw error;

        if (data && data.length > 0) {
          const mapped = data.map((p) => {
            const normalizedTech = (p.tech_stack || []).map(s => String(s).toLowerCase());
            let category = 'Custom Application';

            if (normalizedTech.some(s => s.includes('dashboard') || s.includes('analytics'))) {
              category = 'Dashboard';
            } else if (normalizedTech.some(s => s.includes('ecommerce') || s.includes('shop') || s.includes('commerce'))) {
              category = 'E-Commerce';
            } else if (normalizedTech.some(s => s.includes('ai') || s.includes('gpt') || s.includes('llm') || s.includes('ml'))) {
              category = 'AI Solutions';
            } else if (normalizedTech.some(s => s.includes('erp') || s.includes('crm') || s.includes('management') || s.includes('workflow'))) {
              category = 'Enterprise Software';
            } else if (normalizedTech.some(s => s.includes('inventory') || s.includes('attendance') || s.includes('queue') || s.includes('employee'))) {
              category = 'Internal Management System';
            } else if (normalizedTech.some(s => s.includes('website') || s.includes('web'))) {
              category = 'Business Website';
            }

            const nameLower = (p.name || '').toLowerCase();
            let demoUrl = p.demo_url || p.demoUrl || p.url || null;
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
              stack: p.tech_stack || [],
              category,
              industry: p.category || 'Business',
              status: 'Ready to Customize',
              demoUrl,
            };
          });

          // Merge database products with MOCK_PROJECTS so Template Gallery templates are always visible
          const combined = [...mapped];
          MOCK_PROJECTS.forEach((mock) => {
            if (!combined.some((item) => item.title.toLowerCase() === mock.title.toLowerCase())) {
              combined.push(mock);
            }
          });

          setProducts(combined);
        } else {
          setProducts(MOCK_PROJECTS);
        }
      } catch (err) {
        console.error('Error fetching Supabase products:', err);
        setProducts(MOCK_PROJECTS);
      }
    };

    fetchProducts();
  }, [session]);

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
