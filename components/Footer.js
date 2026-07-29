'use client';
import Link from 'next/link';

export default function Footer({ onOpenInquiry }) {
  return (
    <footer className="bg-[#2C1D11] text-[#FDFBF7] py-16 border-t border-[#800020]/20">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#FDFBF7]/10">
          
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <img 
                src="/logo.jpg" 
                alt="BuildInByte Logo" 
                className="w-8 h-8 rounded-lg object-cover shadow-sm" 
              />
              <span className="font-serif font-bold text-xl text-[#FDFBF7]">
                BuildInByte
              </span>
            </div>
            <p className="text-xs text-[#FDFBF7]/70 max-w-sm leading-relaxed">
              A premium software development agency delivering enterprise-grade solutions for startups, SMEs, and growing businesses.
            </p>
            <div className="pt-2 text-xs text-[#FDFBF7]/90 font-medium">
              <span>Contact: </span>
              <a href="mailto:support@buildinbyte.in" className="font-bold text-rose-300 hover:text-rose-200 hover:underline">
                support@buildinbyte.in
              </a>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/buildinbyte"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#FDFBF7]/70 hover:text-[#FDFBF7] transition-colors flex items-center gap-1"
              >
                GitHub
              </a>
              <span className="text-[#FDFBF7]/20">|</span>
              <a
                href="https://linkedin.com/company/buildinbyte"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#FDFBF7]/70 hover:text-[#FDFBF7] transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="md:col-span-3 space-y-2 text-xs text-[#FDFBF7]/80">
            <h4 className="font-bold uppercase tracking-wider text-[#800020] text-[11px] mb-3">
              Services
            </h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-[#FDFBF7] transition-colors">Web Applications</a></li>
              <li><a href="#services" className="hover:text-[#FDFBF7] transition-colors">Enterprise Software</a></li>
              <li><a href="#services" className="hover:text-[#FDFBF7] transition-colors">AI Solutions</a></li>
              <li><a href="#services" className="hover:text-[#FDFBF7] transition-colors">Dashboards & Analytics</a></li>
              <li><a href="#services" className="hover:text-[#FDFBF7] transition-colors">Mobile Applications</a></li>
              <li><a href="#services" className="hover:text-[#FDFBF7] transition-colors">Business Automation</a></li>
            </ul>
          </div>

          {/* Industries & Technologies Column */}
          <div className="md:col-span-2 space-y-2 text-xs text-[#FDFBF7]/80">
            <h4 className="font-bold uppercase tracking-wider text-[#800020] text-[11px] mb-3">
              Industries
            </h4>
            <ul className="space-y-2">
              <li className="text-[#FDFBF7]/60">Healthcare</li>
              <li className="text-[#FDFBF7]/60">Hospitality</li>
              <li className="text-[#FDFBF7]/60">Retail & E-Commerce</li>
              <li className="text-[#FDFBF7]/60">Real Estate</li>
              <li className="text-[#FDFBF7]/60">Education</li>
              <li className="text-[#FDFBF7]/60">Enterprise</li>
            </ul>
          </div>

          {/* Get In Touch Column */}
          <div className="md:col-span-3 space-y-3 text-xs text-[#FDFBF7]/80">
            <h4 className="font-bold uppercase tracking-wider text-[#800020] text-[11px] mb-3">
              Contact
            </h4>
            <ul className="space-y-2 mb-4">
              <li><a href="#projects" className="hover:text-[#FDFBF7] transition-colors">Our Solutions</a></li>
              <li><a href="#services" className="hover:text-[#FDFBF7] transition-colors">Our Services</a></li>
              <li><a href="#work" className="hover:text-[#FDFBF7] transition-colors">Our Work</a></li>
              <li>
                <a href="mailto:support@buildinbyte.in" className="hover:text-[#FDFBF7] transition-colors">
                  Email Us
                </a>
              </li>
            </ul>
            <div className="space-y-2 pt-3 border-t border-[#FDFBF7]/10">
              <a
                href="mailto:support@buildinbyte.in?subject=Quote Request"
                className="block w-full text-center px-4 py-2.5 rounded-lg bg-[#800020] text-[#FDFBF7] font-bold text-xs hover:bg-[#9a0025] transition-colors"
              >
                Request a Quote
              </a>
              <a
                href="mailto:support@buildinbyte.in?subject=Book Consultation"
                className="block w-full text-center px-4 py-2.5 rounded-lg border border-[#FDFBF7]/20 text-[#FDFBF7]/80 font-bold text-xs hover:bg-[#FDFBF7]/10 transition-colors"
              >
                Book Consultation
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FDFBF7]/60">
          <span>© 2026 BuildInByte. All rights reserved.</span>
          <span className="mt-2 sm:mt-0 text-[#FDFBF7]/40">Premium Custom Software Development Agency</span>
        </div>

      </div>
    </footer>
  );
}
