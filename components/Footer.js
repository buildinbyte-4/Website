'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#060e20] text-[#dae2fd] border-t border-white/10 relative overflow-hidden">
      
      {/* Top Banner Callout */}
      <div className="border-b border-white/10 bg-[#0b1326]/60 backdrop-blur-md py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/30 text-[#4cd7f6] font-mono text-xs tracking-wider uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-pulse"></span>
              <span>● All Systems Operational</span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#dae2fd]">
              Ready to Engineer Your Business Solution?
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:hello@buildinbyte.in"
              className="btn-cyan px-6 py-3 rounded-xl text-xs font-mono tracking-wider uppercase shadow-lg shadow-cyan-500/20"
            >
              hello@buildinbyte.in
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#06b6d4] to-[#8b5cf6] p-[1px]">
                <div className="w-full h-full bg-[#0b1326] rounded-[7px] flex items-center justify-center font-mono font-bold text-sm text-[#4cd7f6]">
                  B
                </div>
              </div>
              <span className="font-display font-extrabold text-xl text-[#dae2fd]">
                BuildInByte
              </span>
            </div>
            <p className="text-xs text-[#869397] font-mono leading-relaxed">
              Engineering Businesses Through Technology. End-to-end software, embedded systems, custom PCB design, and IoT platforms.
            </p>
          </div>

          {/* Column 1: Capabilities */}
          <div>
            <h4 className="font-mono text-xs text-[#06b6d4] tracking-widest uppercase mb-4">
              // Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs text-[#bcc9cd] font-mono">
              <li><a href="#capabilities" className="hover:text-[#4cd7f6] transition-colors">Embedded C/C++ & Firmware</a></li>
              <li><a href="#capabilities" className="hover:text-[#4cd7f6] transition-colors">Multi-Layer PCB Layout</a></li>
              <li><a href="#capabilities" className="hover:text-[#4cd7f6] transition-colors">Industrial IoT Networks</a></li>
              <li><a href="#capabilities" className="hover:text-[#4cd7f6] transition-colors">Cloud & Microservices</a></li>
              <li><a href="#capabilities" className="hover:text-[#4cd7f6] transition-colors">AI & Process Automation</a></li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 className="font-mono text-xs text-[#8b5cf6] tracking-widest uppercase mb-4">
              // Solutions
            </h4>
            <ul className="space-y-2.5 text-xs text-[#bcc9cd] font-mono">
              <li><a href="#products" className="hover:text-[#c4abff] transition-colors">Enterprise Web Apps</a></li>
              <li><a href="#products" className="hover:text-[#c4abff] transition-colors">IoT Monitoring Dashboards</a></li>
              <li><a href="#products" className="hover:text-[#c4abff] transition-colors">Custom Hardware Kits</a></li>
              <li><a href="#products" className="hover:text-[#c4abff] transition-colors">Zeno OS Platform</a></li>
              <li><a href="#products" className="hover:text-[#c4abff] transition-colors">Template Store</a></li>
            </ul>
          </div>

          {/* Column 3: Contact & Legal */}
          <div>
            <h4 className="font-mono text-xs text-[#dae2fd] tracking-widest uppercase mb-4">
              // Connect
            </h4>
            <ul className="space-y-2.5 text-xs text-[#bcc9cd] font-mono mb-6">
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#4cd7f6] transition-colors">GitHub Repository ↗</a></li>
              <li><a href="https://linkedin.com/company/buildinbyte" target="_blank" rel="noreferrer" className="hover:text-[#4cd7f6] transition-colors">LinkedIn Company ↗</a></li>
              <li><Link href="/privacy" className="hover:text-[#4cd7f6] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#4cd7f6] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#869397]">
          <p>© {new Date().getFullYear()} BuildInByte. All Rights Reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Designed & Built with</span>
            <span className="text-[#06b6d4]">Precision-Glow UI</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
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
              <li><Link href="/about" className="transition-colors text-black dark:text-white hover:text-[#1D4FF7] dark:hover:text-[#1D4FF7]">About Us</Link></li>
              <li><Link href="/faq" className="transition-colors text-black dark:text-white hover:text-[#1D4FF7] dark:hover:text-[#1D4FF7]">FAQ</Link></li>
              <li><Link href="/contact" className="transition-colors text-black dark:text-white hover:text-[#1D4FF7] dark:hover:text-[#1D4FF7]">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-wider mb-6 pb-2 text-base font-black border-b-2 border-black dark:border-white">
              <span className="text-[#1D4FF7]">03</span>
              <span className="text-black dark:text-white"> — LEGAL</span>
            </h4>
            <ul className="space-y-4 text-sm uppercase font-bold">
              <li><Link href="/privacy" className="transition-colors text-black dark:text-white hover:text-[#1D4FF7] dark:hover:text-[#1D4FF7]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="transition-colors text-black dark:text-white hover:text-[#1D4FF7] dark:hover:text-[#1D4FF7]">Terms of Service</Link></li>
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


    </footer>
  );
}
