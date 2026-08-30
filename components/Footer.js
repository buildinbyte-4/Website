'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-footer text-ink border-t border-line">
      <div className="border-b border-line py-16">
        <div className="page-wrap flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="label-meta mb-3">Next step</p>
            <h3 className="font-display font-semibold text-2xl sm:text-3xl text-ink tracking-tight">
              Ready to engineer your next system?
            </h3>
          </div>
          <a href="mailto:hello@buildinbyte.in" className="btn-primary text-xs">
            hello@buildinbyte.in
          </a>
        </div>
      </div>

      <div className="page-wrap py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-ink flex items-center justify-center font-display font-semibold text-sm">
                B
              </div>
              <span className="font-display font-semibold text-xl text-ink">
                BuildInByte
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              End-to-end software, embedded systems, custom PCB design, and IoT platforms.
            </p>
          </div>

          <div>
            <h4 className="label-meta mb-4">Capabilities</h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><a href="/#capabilities" className="hover:text-accent">Embedded C/C++ & firmware</a></li>
              <li><a href="/#capabilities" className="hover:text-accent">Multi-layer PCB layout</a></li>
              <li><a href="/#capabilities" className="hover:text-accent">Industrial IoT networks</a></li>
              <li><a href="/#capabilities" className="hover:text-accent">Cloud & microservices</a></li>
              <li><a href="/#capabilities" className="hover:text-accent">AI & process automation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="label-meta mb-4">Work</h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><a href="/#products" className="hover:text-accent">Enterprise web apps</a></li>
              <li><a href="/#products" className="hover:text-accent">IoT monitoring dashboards</a></li>
              <li><Link href="/templates" className="hover:text-accent">Template gallery</Link></li>
              <li><Link href="/about" className="hover:text-accent">About the studio</Link></li>
              <li><Link href="/faq" className="hover:text-accent">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="label-meta mb-4">Connect</h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-accent">GitHub</a></li>
              <li><a href="https://linkedin.com/company/buildinbyte" target="_blank" rel="noreferrer" className="hover:text-accent">LinkedIn</a></li>
              <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-accent">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-accent">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 mt-12 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-faint">
          <p>© {new Date().getFullYear()} BuildInByte. All rights reserved.</p>
          <p>Engineering businesses through technology.</p>
        </div>
      </div>
    </footer>
  );
}
