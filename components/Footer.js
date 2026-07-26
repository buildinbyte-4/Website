'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#2C1D11] text-[#FDFBF7] py-16 border-t border-[#800020]/20">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#FDFBF7]/10">
          
          <div className="md:col-span-6 space-y-3">
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
              A 3-person student collective delivering ready-to-use digital software products and custom full-stack solutions.
            </p>
            <div className="pt-2 text-xs text-[#FDFBF7]/90 font-medium">
              <span>Contact for Sales & Queries: </span>
              <a href="mailto:support@buildinbyte.in" className="font-bold text-rose-300 hover:text-rose-200 hover:underline">
                support@buildinbyte.in
              </a>
            </div>
          </div>

          <div className="md:col-span-6 space-y-2 text-xs text-[#FDFBF7]/80 text-right">
            <h4 className="font-bold uppercase tracking-wider text-[#800020] text-[11px] mb-3">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li><a href="#projects" className="hover:text-[#FDFBF7] transition-colors">Available Projects</a></li>
              <li><a href="#services" className="hover:text-[#FDFBF7] transition-colors">Custom Services</a></li>
              <li><a href="#work" className="hover:text-[#FDFBF7] transition-colors">Our Work</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FDFBF7]/60">
          <span>© 2026 BuildInByte. All rights reserved.</span>
        </div>

      </div>
    </footer>
  );
}
