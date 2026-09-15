'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MetricsBanner from '@/components/MetricsBanner';
import ProjectStore from '@/components/ProjectStore';
import CustomServices from '@/components/CustomServices';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import FloatingContactButton from '@/components/FloatingContactButton';
import StarField from '@/components/StarField';
import { useProducts } from '@/hooks/useProducts';

const DemoModal = dynamic(() => import('@/components/DemoModal'));
const InquiryModal = dynamic(() => import('@/components/InquiryModal'));
const LoginScreen = dynamic(() => import('@/components/LoginScreen'));
const ProfileModal = dynamic(() => import('@/components/ProfileModal'));

export default function HomePage() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { products, loading: productsLoading, error: productsError, refetch: refetchProducts } = useProducts();
  const [demoProject, setDemoProject] = useState(null);
  const [inquiryConfig, setInquiryConfig] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  // 0. Auto-redirect port 3000 -> port 8000 fallback
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.port === '3000') {
      window.location.replace(window.location.href.replace(':3000', ':8000'));
    }
    const params = new URLSearchParams(window.location.search);
    if (params.get('login') === '1') {
      setShowLogin(true);
      params.delete('login');
      const query = params.toString();
      window.history.replaceState({}, document.title, `${window.location.pathname}${query ? `?${query}` : ''}`);
    }
  }, []);

  // Auth
  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return undefined;
    }

    const handleInitialAuth = async () => {
      if (typeof window !== 'undefined' && window.location.hash) {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (accessToken) {
          try {
            setAuthLoading(true);
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || ''
            });
            if (error) throw error;
            if (data?.session) {
              setSession(data.session);
              setShowLogin(false);
            }
          } catch (err) {
            console.error('Error parsing hash session:', err.message);
          } finally {
            window.history.replaceState(
              {},
              document.title,
              window.location.pathname + window.location.search
            );
          }
        }
      }

      const [{ data: { session: currentSession } }, { data: { user: authenticatedUser } }] = await Promise.all([
        supabase.auth.getSession(),
        supabase.auth.getUser(),
      ]);
      setSession(authenticatedUser ? currentSession : null);
      setAuthLoading(false);
    };

    handleInitialAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setShowLogin(false);
      }
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Auth gate wrapper for action conversions
  const handleInquiryRequest = (config) => {
    if (!session) {
      setLoginMessage("Please log in or create an account to modify templates or request quotes.");
      setShowLogin(true); // Gated transition: open login panel
    } else {
      setInquiryConfig(config); // Authorised transition: open submission form
    }
  };

  // Auth Loading State
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border border-slate-200 dark:border-white/10 bg-accent-soft animate-spin"></div>
          <span className="text-xl font-bold text-foreground  tracking-widest font-display">
            LOADING
          </span>
        </div>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <div className="relative isolate min-h-screen overflow-hidden bg-canvas text-foreground font-sans antialiased selection:bg-accent-soft selection:text-foreground">
        <StarField />
        <div className="relative z-10">
        
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
          isLoading={productsLoading}
          loadError={productsError}
          onRetry={refetchProducts}
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
            onClose={() => {
              setShowLogin(false);
              setLoginMessage('');
            }} 
            message={loginMessage}
          />
        )}

        {/* User Profile Modal */}
        {showProfile && (
          <ProfileModal
            user={session?.user}
            onClose={() => setShowProfile(false)}
          />
        )}



        {/* Floating Contact Button */}
        <FloatingContactButton onClick={handleInquiryRequest} />
        </div>

      </div>
    </SmoothScroll>
  );
}
