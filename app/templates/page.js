'use client';
import { useState } from 'react';
import Link from 'next/link';

const TEMPLATES = [
  {
    id: 'buildinbyte-luxury-hotel',
    name: 'BuildInByte Luxury Hotel',
    category: 'Hospitality',
    description: 'Ultra-luxury resort & boutique hotel website template with immersive room showcases, amenity galleries, and booking conversion flows.',
    url: '/templates/buildinbyte-luxury-hotel/index.html',
    badge: 'Luxury Hospitality'
  },
  {
    id: 'luxury-hotel',
    name: 'Luxury Hotel Experience',
    category: 'Hospitality',
    description: 'Modern elegant hotel experience template featuring room reservation UI, spa/dining sections, and guest reviews.',
    url: '/templates/luxury-hotel/index.html',
    badge: 'Boutique Hotel'
  },
  {
    id: 'real-estate',
    name: 'Real Estate & Properties',
    category: 'Real Estate',
    description: 'High-converting real estate listing showcase template for property developers, brokers, and agencies.',
    url: '/templates/real-estate/index.html',
    badge: 'Property & Housing'
  },
  {
    id: 'elecstore',
    name: 'ElecStore E-Commerce',
    category: 'Retail & E-Commerce',
    description: 'Full-featured electronic storefront template with product grids, promotional deals, and clean modern layout.',
    url: '/templates/elecstore/index.html',
    badge: 'Electronics Retail'
  },
  {
    id: 'kanchimarket',
    name: 'Kanchi Marketplace',
    category: 'Retail & E-Commerce',
    description: 'Vibrant local marketplace template crafted for multi-category product discovery and direct merchant sales.',
    url: '/templates/kanchimarket/index.html',
    badge: 'Commerce & Retail'
  },
  {
    id: 'scsvmv',
    name: 'SCSVMV Institution',
    category: 'Education & Enterprise',
    description: 'Institutional public-facing website template tailored for educational organizations, universities, and academies.',
    url: '/templates/scsvmv/index.html',
    badge: 'Academic / Institutional'
  }
];

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [previewDevice, setPreviewDevice] = useState('desktop'); // desktop | tablet | mobile

  return (
    <div className="min-h-screen bg-bg-primary-dark text-[#FFFDF9] flex flex-col font-sans">
      
      {/* Top Bar Navigation */}
      <header className="bg-bg-primary-dark border-b border-accent-blue px-6 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs font-bold bg-accent-blue/40 hover:bg-accent-blue text-[#FDFBF7] px-3 py-1.5 rounded-lg border border-accent-blue transition-all flex items-center gap-1.5"
          >
            ← Back to BuildInByte
          </Link>
          <div className="h-4 w-[1px] bg-accent-blue/40 hidden sm:block"></div>
          <div>
            <h1 className="font-display text-lg font-bold text-[#FDFBF7] leading-tight">
              BuildInByte Template Suite
            </h1>
            <p className="text-[11px] text-[#D4C3B5] hidden sm:block">
              Interactive Static Website Gallery & Live Previews
            </p>
          </div>
        </div>

        {/* Device Responsive Controls & Launch Action */}
        <div className="flex items-center gap-3">
          <div className="bg-bg-primary-dark border border-accent-blue rounded-lg p-1 hidden md:flex items-center gap-1 text-xs">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`px-2.5 py-1 rounded font-bold transition-all ${
                previewDevice === 'desktop' ? 'bg-accent-blue text-white' : 'text-text-muted hover:text-white'
              }`}
            >
              💻 Desktop
            </button>
            <button
              onClick={() => setPreviewDevice('tablet')}
              className={`px-2.5 py-1 rounded font-bold transition-all ${
                previewDevice === 'tablet' ? 'bg-accent-blue text-white' : 'text-text-muted hover:text-white'
              }`}
            >
              📱 Tablet
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`px-2.5 py-1 rounded font-bold transition-all ${
                previewDevice === 'mobile' ? 'bg-accent-blue text-white' : 'text-text-muted hover:text-white'
              }`}
            >
              📲 Mobile
            </button>
          </div>

          <a
            href={selectedTemplate.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent-blue hover:bg-[#9E1B32] text-white text-xs px-4 py-2 rounded-lg font-bold shadow-md transition-all flex items-center gap-1"
          >
            Open Standalone ↗
          </a>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Sidebar: Template Directory */}
        <aside className="w-full lg:w-80 bg-[#231215] border-r border-accent-blue p-4 overflow-y-auto space-y-3 shrink-0">
          <div className="text-[11px] uppercase font-bold text-text-muted tracking-wider px-1">
            Available Website Templates ({TEMPLATES.length})
          </div>

          <div className="space-y-2">
            {TEMPLATES.map((tmpl) => {
              const isSelected = selectedTemplate.id === tmpl.id;
              return (
                <div
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-accent-blue/40 border-accent-blue shadow-md ring-1 ring-[#800020]'
                      : 'bg-bg-primary-dark border-accent-blue hover:border-accent-blue hover:bg-bg-primary-dark'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold text-[#D4C3B5] bg-accent-blue/30 px-2 py-0.5 rounded border border-accent-blue">
                      {tmpl.badge}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-sm text-[#FDFBF7] mb-1">
                    {tmpl.name}
                  </h3>
                  <p className="text-[11px] text-[#A8988C] line-clamp-2 leading-relaxed">
                    {tmpl.description}
                  </p>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Right Area: Interactive Live Viewport */}
        <main className="flex-1 bg-[#0F0805] flex flex-col items-center justify-center p-4 relative overflow-hidden">
          
          {/* Active Template Header Info */}
          <div className="w-full max-w-5xl mb-3 flex items-center justify-between text-xs text-text-muted px-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#FDFBF7]">{selectedTemplate.name}</span>
              <span>•</span>
              <span>{selectedTemplate.category}</span>
            </div>
            <div className="font-mono text-[11px] bg-bg-primary-dark px-2.5 py-1 rounded border border-accent-blue text-[#D4C3B5]">
              Path: {selectedTemplate.url}
            </div>
          </div>

          {/* Responsive Frame Container */}
          <div
            className={`transition-all duration-300 ease-in-out border border-accent-blue rounded-xl overflow-hidden shadow-2xl bg-white ${
              previewDevice === 'desktop'
                ? 'w-full max-w-6xl h-[calc(100vh-160px)]'
                : previewDevice === 'tablet'
                ? 'w-[768px] h-[calc(100vh-160px)]'
                : 'w-[375px] h-[667px]'
            }`}
          >
            <iframe
              key={selectedTemplate.id}
              src={selectedTemplate.url}
              title={selectedTemplate.name}
              className="w-full h-full border-0"
            />
          </div>
        </main>

      </div>
    </div>
  );
}
