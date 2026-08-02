'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#FFFFFF' }} className="py-16 mt-auto border-t-4 border-[#000000]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          <div className="md:col-span-1">
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="group mb-6">
              <img src="/logo.jpg" alt="BuildInByte Logo" className="h-10 w-auto" />
              <span className="font-display font-black text-2xl tracking-tighter text-[#000000] uppercase">
                BuildInByte
              </span>
            </Link>
            <p className="text-sm font-bold uppercase leading-snug mb-6 text-[#18181B]">
              Production-grade software engineering for ambitious companies.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white text-[#000000] flex items-center justify-center font-bold hover:bg-[#F8FAFC] transition-colors border border-[#000000]">
                X
              </a>
              <a href="#" className="w-10 h-10 bg-white text-[#000000] flex items-center justify-center font-bold hover:bg-[#F8FAFC] transition-colors border border-[#000000]">
                IN
              </a>
              <a href="#" className="w-10 h-10 bg-white text-[#000000] flex items-center justify-center font-bold hover:bg-[#F8FAFC] transition-colors border border-[#000000]">
                GH
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-wider mb-6 pb-2" style={{ color: '#000000', fontWeight: 700 }}>
              SOLUTIONS
            </h4>
            <ul className="space-y-4 text-sm uppercase font-bold">
              <li><a href="#" className="transition-colors text-[#18181B] hover:text-[#0066FF]">Custom Web Apps</a></li>
              <li><a href="#" className="transition-colors text-[#18181B] hover:text-[#0066FF]">Enterprise Systems</a></li>
              <li><a href="#" className="transition-colors text-[#18181B] hover:text-[#0066FF]">AI & Automation</a></li>
              <li><a href="#" className="transition-colors text-[#18181B] hover:text-[#0066FF]">API Architecture</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-wider mb-6 pb-2" style={{ color: '#000000', fontWeight: 700 }}>
              COMPANY
            </h4>
            <ul className="space-y-4 text-sm uppercase font-bold">
              <li><a href="#" className="transition-colors text-[#18181B] hover:text-[#0066FF]">About Us</a></li>
              <li><a href="#services" className="transition-colors text-[#18181B] hover:text-[#0066FF]">FAQ</a></li>

              <li><Link href="/contact" className="transition-colors text-[#18181B] hover:text-[#0066FF]">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-wider mb-6 pb-2" style={{ color: '#000000', fontWeight: 700 }}>
              LEGAL
            </h4>
            <ul className="space-y-4 text-sm uppercase font-bold">
              <li><Link href="/privacy" className="transition-colors text-[#18181B] hover:text-[#0066FF]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="transition-colors text-[#18181B] hover:text-[#0066FF]">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t-2 border-[#E2E8F0] text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm uppercase font-bold text-[#64748B]">
            &copy; {new Date().getFullYear()} BuildInByte. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
