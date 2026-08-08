'use client';
import Link from 'next/link';

export default function Footer() {
  const socials = [
    { 
      label: 'X', 
      href: '#', 
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    { 
      label: 'IN', 
      href: '#', 
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
        </svg>
      )
    },
    { 
      label: 'GH', 
      href: '#', 
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      )
    },
  ];

  return (
    <footer className="relative z-50 mt-auto bg-white dark:bg-black text-black dark:text-white border-t-4 border-black dark:border-white transition-colors duration-200 overflow-hidden">
      
      {/* 1. CTA STRIP */}
      <Link 
        href="/contact" 
        className="group/cta block w-full bg-black py-10 border-b-4 border-black dark:border-white hover:bg-zinc-900 transition-colors duration-100"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
          <span className="font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter uppercase text-white">
            LET'S BUILD SOMETHING
          </span>
          <span className="font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl transform transition-transform duration-100 ease-linear group-hover/cta:translate-x-[8px] select-none text-white shrink-0">
            →
          </span>
        </div>
      </Link>

      {/* 3. WATERMARK WORDMARK */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden pointer-events-none select-none z-0 hidden md:block" style={{ height: '220px' }}>
        <div className="footer-watermark font-display font-black text-center leading-none tracking-widest" style={{ fontSize: '180px' }}>
          BUILDINBYTE
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-1 flex flex-col justify-between">
            <div>
              <Link href="/" className="flex items-center gap-3 shrink-0 mb-6">
                <img src="/logo.jpg" alt="BuildInByte Logo" className="h-10 w-auto" />
                <span className="font-display font-black text-2xl tracking-tighter text-black dark:text-white uppercase">
                  BuildInByte
                </span>
              </Link>
              <p className="text-sm font-bold uppercase leading-snug mb-6 text-black dark:text-white">
                Production-grade software engineering for ambitious companies.
              </p>
              {/* 6. STATUS PILL */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-black dark:border-white bg-white dark:bg-black text-xs font-black uppercase tracking-wider text-black dark:text-white mb-6">
                <div className="pulse-dot"></div>
                <span>AVAILABLE FOR PROJECTS</span>
              </div>
            </div>

            {/* 5. SOCIAL ICON MAGNETIC HOVER */}
            <div className="flex flex-row gap-4 items-center mt-4 z-10 relative">
              {socials.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  className="social-link-horizontal group/social flex items-center relative overflow-hidden pointer-events-auto shrink-0 w-10 hover:w-[176px]"
                  aria-label={s.label === 'X' ? 'Follow on X' : s.label === 'IN' ? 'Connect on LinkedIn' : 'View on GitHub'}
                >
                  <span className="social-icon-horizontal">
                    {s.icon}
                  </span>
                  <span className="social-label-horizontal">
                    {s.label === 'X' ? 'FOLLOW ON X' : s.label === 'IN' ? 'CONNECT ON LINKEDIN' : 'VIEW ON GITHUB'}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* 2. NUMBERED COLUMNS */}
          <div>
            <h4 className="font-display uppercase tracking-wider mb-6 pb-2 text-base font-black border-b-2 border-black dark:border-white">
              <span className="text-[#1D4FF7]">01</span>
              <span className="text-black dark:text-white"> — SOLUTIONS</span>
            </h4>
            <ul className="space-y-4 text-sm uppercase font-bold">
              <li><a href="#" className="transition-colors text-black dark:text-white hover:text-[#1D4FF7] dark:hover:text-[#1D4FF7]">Custom Web Apps</a></li>
              <li><a href="#" className="transition-colors text-black dark:text-white hover:text-[#1D4FF7] dark:hover:text-[#1D4FF7]">Enterprise Systems</a></li>
              <li><a href="#" className="transition-colors text-black dark:text-white hover:text-[#1D4FF7] dark:hover:text-[#1D4FF7]">AI & Automation</a></li>
              <li><a href="#" className="transition-colors text-black dark:text-white hover:text-[#1D4FF7] dark:hover:text-[#1D4FF7]">API Architecture</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-wider mb-6 pb-2 text-base font-black border-b-2 border-black dark:border-white">
              <span className="text-[#1D4FF7]">02</span>
              <span className="text-black dark:text-white"> — COMPANY</span>
            </h4>
            <ul className="space-y-4 text-sm uppercase font-bold">
              <li><a href="#" className="transition-colors text-black dark:text-white hover:text-[#1D4FF7] dark:hover:text-[#1D4FF7]">About Us</a></li>
              <li><a href="#" className="transition-colors text-black dark:text-white hover:text-[#1D4FF7] dark:hover:text-[#1D4FF7]">Careers</a></li>
              <li><a href="#" className="transition-colors text-black dark:text-white hover:text-[#1D4FF7] dark:hover:text-[#1D4FF7]">Case Studies</a></li>
              <li><a href="#" className="transition-colors text-black dark:text-white hover:text-[#1D4FF7] dark:hover:text-[#1D4FF7]">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-wider mb-6 pb-2 text-base font-black border-b-2 border-black dark:border-white">
              <span className="text-[#1D4FF7]">03</span>
              <span className="text-black dark:text-white"> — LEGAL</span>
            </h4>
            <ul className="space-y-4 text-sm uppercase font-bold">
              <li><a href="#" className="transition-colors text-black dark:text-white hover:text-[#1D4FF7] dark:hover:text-[#1D4FF7]">Privacy Policy</a></li>
              <li><a href="#" className="transition-colors text-black dark:text-white hover:text-[#1D4FF7] dark:hover:text-[#1D4FF7]">Terms of Service</a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* 4. MARQUEE STRIP */}
      <div className="marquee-container bg-black border-t-4 border-b-4 border-black dark:border-white text-white py-3 overflow-hidden select-none relative z-10">
        <div className="marquee-content whitespace-nowrap inline-flex">
          <span className="text-white text-sm font-black tracking-widest uppercase">
            &nbsp;AVAILABLE FOR NEW PROJECTS — REACT & NEXT.JS — NODE APIS — POSTGRESQL — AWS / GCP — EMBEDDED C/C++ — PCB DESIGN —
          </span>
          <span className="text-white text-sm font-black tracking-widest uppercase">
            &nbsp;AVAILABLE FOR NEW PROJECTS — REACT & NEXT.JS — NODE APIS — POSTGRESQL — AWS / GCP — EMBEDDED C/C++ — PCB DESIGN —
          </span>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 py-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <p className="text-xs uppercase font-black text-[#64748B] dark:text-[#A1A1AA]">
          &copy; {new Date().getFullYear()} BuildInByte. All rights reserved.
        </p>
      </div>

    </footer>
  );
}
