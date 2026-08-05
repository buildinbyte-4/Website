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
import FloatingContactButton from '@/components/FloatingContactButton';
import { PROJECTS as MOCK_PROJECTS } from '@/lib/data';

export default function HomePage() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [products, setProducts] = useState(MOCK_PROJECTS); // Start with mock projects
  const [demoProject, setDemoProject] = useState(null);
  const [inquiryConfig, setInquiryConfig] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // 0. Auto-redirect port 3000 -> port 8000 fallback
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.port === '3000') {
      window.location.replace(window.location.href.replace(':3000', ':8000'));
    }
  }, []);

  // Auth
  useEffect(() => {
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

      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
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

        {/* My Desk Workspace Section */}
        <section id="my-desk" className="py-20 bg-brutal-bg border-b-4 border-brutal-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="font-black text-xs uppercase tracking-widest text-white bg-brutal-blue px-3 py-1 border-2 border-brutal-black inline-block mb-4 shadow-brutal-sm">
                Developer Desk
              </span>
              <h2 className="font-display text-4xl sm:text-6xl font-black text-brutal-black uppercase leading-none">
                My Workspace
              </h2>
              <p className="text-lg text-brutal-black font-bold uppercase mt-6 leading-relaxed">
                Manage your projects, support tickets, and direct lines of communication.
              </p>
            </div>

            {session ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="editorial-card p-8 bg-brutal-yellow">
                  <span className="text-4xl mb-4 block">📦</span>
                  <h3 className="font-display font-black text-2xl mb-2 uppercase">My Projects</h3>
                  <p className="text-xs font-bold uppercase text-brutal-black mb-4">View your active deployments and codebases.</p>
                  <a href="#case-studies" className="btn-secondary py-2 justify-center text-xs w-full text-center block bg-white border-2 border-black">
                    View Catalog
                  </a>
                </div>

                <div className="editorial-card p-8 bg-brutal-pink">
                  <span className="text-4xl mb-4 block">🎫</span>
                  <h3 className="font-display font-black text-2xl mb-2 uppercase">Support Tickets</h3>
                  <p className="text-xs font-bold uppercase text-brutal-black mb-4">Raise bugs, request adjustments, or view updates.</p>
                  <button 
                    onClick={() => handleInquiryRequest({ title: 'Raise a Support Ticket' })}
                    className="btn-primary py-2 justify-center text-xs w-full text-center cursor-pointer"
                  >
                    Open Support Ticket
                  </button>
                </div>

                <div className="editorial-card p-8 bg-brutal-green">
                  <span className="text-4xl mb-4 block">💬</span>
                  <h3 className="font-display font-black text-2xl mb-2 uppercase">Scoping & Scans</h3>
                  <p className="text-xs font-bold uppercase text-brutal-black mb-4">Schedule live architecture design calls.</p>
                  <button 
                    onClick={() => handleInquiryRequest({ title: 'Book a Technical Scoping Call' })}
                    className="btn-primary py-2 justify-center text-xs w-full text-center cursor-pointer"
                  >
                    Book Call
                  </button>
                </div>
              </div>
            ) : (
              <div className="editorial-card p-12 bg-white text-center max-w-2xl mx-auto border-4 border-black">
                <span className="text-5xl mb-6 block">🔒</span>
                <h3 className="font-display font-black text-3xl mb-4 uppercase">Authentication Required</h3>
                <p className="text-sm font-bold uppercase text-zinc-600 mb-8">
                  Log in with Google to access your active workspace, support tickets, and scheduled consultation channels.
                </p>
                <button
                  onClick={() => setShowLogin(true)}
                  className="btn-primary px-8 py-3 text-sm font-black uppercase cursor-pointer"
                >
                  Log In Now
                </button>
              </div>
            )}
          </div>
        </section>

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

        {/* Floating Contact Button */}
        <FloatingContactButton onClick={handleInquiryRequest} />

      </div>
    </SmoothScroll>
  );
}
