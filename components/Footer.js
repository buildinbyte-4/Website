'use client';
import Link from 'next/link';
import { useSettings } from '@/hooks/useSettings';

export default function Footer() {
  const { settings, loading, error } = useSettings();
  const companyName = settings?.company_name || 'BuildInByte';
  const description = settings?.address ? `${settings.address}` : 'Production-grade software engineering for ambitious companies.';
  const socials = [
    { label: 'X', href: settings?.twitter || '#', icon: 'X' },
    { label: 'IN', href: settings?.linkedin || '#', icon: 'IN' },
    { label: 'GH', href: settings?.github || '#', icon: 'GH' },
  ];

  return (
    <footer className="py-16 mt-auto bg-white dark:bg-black text-black dark:text-white border-t-2 border-black dark:border-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 shrink-0 mb-6">
              <img src="/logo.jpg" alt="BuildInByte Logo" className="h-10 w-auto animate-pulse" />
              <span className="font-display font-black text-2xl tracking-tighter text-black dark:text-white uppercase">
                BuildInByte
              </span>
            </Link>
            <p className="text-sm font-bold uppercase leading-snug mb-6 text-black dark:text-white">
              Production-grade software engineering for ambitious companies.
            </p>
            <div className="flex gap-4">
              <a href="#" className="footer-social-btn w-10 h-10 flex items-center justify-center font-bold text-sm bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white transition-colors duration-150 hover:bg-[#0066FF] hover:text-white dark:hover:bg-[#0066FF]">
                X
              </a>
              <a href="#" className="footer-social-btn w-10 h-10 flex items-center justify-center font-bold text-sm bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white transition-colors duration-150 hover:bg-[#0066FF] hover:text-white dark:hover:bg-[#0066FF]">
                IN
              </a>
              <a href="#" className="footer-social-btn w-10 h-10 flex items-center justify-center font-bold text-sm bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white transition-colors duration-150 hover:bg-[#0066FF] hover:text-white dark:hover:bg-[#0066FF]">
                GH
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-wider mb-6 pb-2 text-black dark:text-white font-bold">
              SOLUTIONS
            </h4>
            <ul className="space-y-4 text-sm uppercase font-bold">
              <li><a href="#" className="transition-colors text-black dark:text-white hover:text-[#0066FF] dark:hover:text-[#0066FF]">Custom Web Apps</a></li>
              <li><a href="#" className="transition-colors text-black dark:text-white hover:text-[#0066FF] dark:hover:text-[#0066FF]">Enterprise Systems</a></li>
              <li><a href="#" className="transition-colors text-black dark:text-white hover:text-[#0066FF] dark:hover:text-[#0066FF]">AI & Automation</a></li>
              <li><a href="#" className="transition-colors text-black dark:text-white hover:text-[#0066FF] dark:hover:text-[#0066FF]">API Architecture</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-wider mb-6 pb-2 text-black dark:text-white font-bold">
              COMPANY
            </h4>
            <ul className="space-y-4 text-sm uppercase font-bold">
              <li><Link href="/about" className="transition-colors text-black dark:text-white hover:text-[#0066FF] dark:hover:text-[#0066FF]">About Us</Link></li>
              <li><Link href="/faq" className="transition-colors text-black dark:text-white hover:text-[#0066FF] dark:hover:text-[#0066FF]">FAQ</Link></li>
              <li><Link href="/contact" className="transition-colors text-black dark:text-white hover:text-[#0066FF] dark:hover:text-[#0066FF]">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-wider mb-6 pb-2 text-black dark:text-white font-bold">
              LEGAL
            </h4>
            <ul className="space-y-4 text-sm uppercase font-bold">
              <li><Link href="/privacy" className="transition-colors text-black dark:text-white hover:text-[#0066FF] dark:hover:text-[#0066FF]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="transition-colors text-black dark:text-white hover:text-[#0066FF] dark:hover:text-[#0066FF]">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

      </div>
    </footer>
  );
}
