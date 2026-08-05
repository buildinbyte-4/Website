'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-16 mt-auto border-t-4 border-black dark:border-white bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 shrink-0 mb-6">
              <img src="/logo.jpg" alt="BuildInByte Logo" className="h-10 w-auto animate-pulse" />
              <span className="font-display font-black text-2xl tracking-tighter text-black dark:text-white uppercase">
                BuildInByte
              </span>
            </Link>
            <p className="text-sm font-bold uppercase leading-snug mb-6 text-zinc-800 dark:text-zinc-200">
              Production-grade software engineering for ambitious companies.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white dark:bg-black text-black dark:text-white flex items-center justify-center font-bold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors border border-black dark:border-white">
                X
              </a>
              <a href="#" className="w-10 h-10 bg-white dark:bg-black text-black dark:text-white flex items-center justify-center font-bold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors border border-black dark:border-white">
                IN
              </a>
              <a href="#" className="w-10 h-10 bg-white dark:bg-black text-black dark:text-white flex items-center justify-center font-bold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors border border-black dark:border-white">
                GH
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-wider mb-6 pb-2 text-black dark:text-white font-bold">
              SOLUTIONS
            </h4>
            <ul className="space-y-4 text-sm uppercase font-bold">
              <li><a href="#" className="transition-colors text-zinc-800 dark:text-zinc-200 hover:text-[#0066FF] dark:hover:text-[#0066FF]">Custom Web Apps</a></li>
              <li><a href="#" className="transition-colors text-zinc-800 dark:text-zinc-200 hover:text-[#0066FF] dark:hover:text-[#0066FF]">Enterprise Systems</a></li>
              <li><a href="#" className="transition-colors text-zinc-800 dark:text-zinc-200 hover:text-[#0066FF] dark:hover:text-[#0066FF]">AI & Automation</a></li>
              <li><a href="#" className="transition-colors text-zinc-800 dark:text-zinc-200 hover:text-[#0066FF] dark:hover:text-[#0066FF]">API Architecture</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-wider mb-6 pb-2 text-black dark:text-white font-bold">
              COMPANY
            </h4>
            <ul className="space-y-4 text-sm uppercase font-bold">
              <li><Link href="/about" className="transition-colors text-zinc-800 dark:text-zinc-200 hover:text-[#0066FF] dark:hover:text-[#0066FF]">About Us</Link></li>
              <li><Link href="/faq" className="transition-colors text-zinc-800 dark:text-zinc-200 hover:text-[#0066FF] dark:hover:text-[#0066FF]">FAQ</Link></li>
              <li><Link href="/contact" className="transition-colors text-zinc-800 dark:text-zinc-200 hover:text-[#0066FF] dark:hover:text-[#0066FF]">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase tracking-wider mb-6 pb-2 text-black dark:text-white font-bold">
              LEGAL
            </h4>
            <ul className="space-y-4 text-sm uppercase font-bold">
              <li><Link href="/privacy" className="transition-colors text-zinc-800 dark:text-zinc-200 hover:text-[#0066FF] dark:hover:text-[#0066FF]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="transition-colors text-zinc-800 dark:text-zinc-200 hover:text-[#0066FF] dark:hover:text-[#0066FF]">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t-2 border-zinc-200 dark:border-zinc-800 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm uppercase font-bold text-zinc-800 dark:text-zinc-200">
            &copy; {new Date().getFullYear()} BuildInByte. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
