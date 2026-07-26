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
          const mapped = data.map(p => ({
            id: p.id,
            title: p.name,
            desc: p.description,
            price: typeof p.price_usd === 'number' ? `₹${p.price_usd.toLocaleString()}` : `₹${p.price_usd}`,
            stack: p.tech_stack || [],
            category: p.tech_stack?.some(s => s.toLowerCase().includes('mobile') || s.toLowerCase().includes('native')) 
              ? 'Mobile Apps' 
              : p.tech_stack?.some(s => s.toLowerCase().includes('gpt') || s.toLowerCase().includes('ai') || s.toLowerCase().includes('llm'))
              ? 'AI Tools'
              : p.tech_stack?.some(s => s.toLowerCase().includes('api') || s.toLowerCase().includes('microservice'))
              ? 'APIs'
              : 'Web Apps',
            status: 'Available Instantly',
          }));
          setProducts(mapped);
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
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-t-transparent border-[#800020] rounded-full animate-spin"></div>
          <span className="text-xs font-bold text-[#8C7B6E] uppercase tracking-widest">
            Establishing Secure Session...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C1D11] font-sans antialiased selection:bg-[#800020]/15 selection:text-[#800020]">
      
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
  );
}
