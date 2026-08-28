'use client';

import { useState } from 'react';
import { PROJECTS } from '@/lib/data';
import ProjectCoverArt from './ProjectCoverArt';

export default function ProjectStore({ customProjects, onOpenDemo, onOpenInquiry }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const displayList = customProjects && customProjects.length > 0 ? customProjects : PROJECTS;
  const dynamicFilterTabs = ['All', ...Array.from(new Set(displayList.map(p => p.category)))];

  const filteredProjects = displayList.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (p.stack && p.stack.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products" className="py-24 bg-[#0b1326] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/30 text-[#4cd7f6] font-mono text-xs tracking-wider uppercase mb-3">
              <span>// PRODUCTS_AND_TEMPLATES</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#dae2fd] tracking-tight">
              Featured Solutions & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4cd7f6] to-[#8b5cf6]">
                Engineering Work
              </span>
            </h2>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder="Search stack, title, or IoT..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-input px-4 py-2.5 rounded-xl text-sm font-mono placeholder:text-[#869397]"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/5">
          {dynamicFilterTabs.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                  isSelected
                    ? 'bg-[#06b6d4] text-[#001f26] font-bold shadow-lg shadow-cyan-500/20'
                    : 'bg-[#131b2e] text-[#bcc9cd] border border-white/5 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid of Products / Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
            >
              {/* Cover Art Image */}
              <div className="relative h-48 bg-[#060e20] overflow-hidden border-b border-white/10">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <ProjectCoverArt category={project.category} title={project.title} />
                )}
                <div className="absolute top-3 left-3">
                  <span className="tech-badge-violet bg-[#0b1326]/80 backdrop-blur-md">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-[#dae2fd] group-hover:text-[#4cd7f6] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#bcc9cd] line-clamp-3 leading-relaxed font-normal">
                    {project.desc}
                  </p>
                </div>

                {/* Tech Stack Chips */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {project.stack && project.stack.map((stk, sIdx) => (
                    <span key={sIdx} className="tech-badge">
                      {stk}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onOpenDemo(project)}
                    className="flex-1 btn-ghost-cyan py-2 rounded-lg text-xs font-mono text-center"
                  >
                    Live Demo ↗
                  </button>
                  <button
                    onClick={() => onOpenInquiry({ title: `Inquiry: ${project.title}` })}
                    className="flex-1 btn-cyan py-2 rounded-lg text-xs font-mono text-center"
                  >
                    Custom Quote
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="glass-panel p-12 rounded-2xl text-center border border-white/10 my-8">
            <p className="text-base text-[#bcc9cd] font-mono">No engineering products match your current query.</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-4 btn-ghost-cyan px-4 py-2 rounded-lg text-xs font-mono"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
              </span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl font-black text-brutal-black uppercase tracking-tighter leading-none">
              CASE STUDIES
            </h2>
            <p className="text-xl text-brutal-black mt-4 max-w-2xl font-bold uppercase">
              Real-world software solutions architected for scale. We deliver measurable results.
            </p>
          </div>

          <div className="text-right border-4 border-brutal-black p-4 bg-white dark:bg-black shadow-brutal-sm select-none">
            <span className="font-black text-sm text-brutal-black block mb-1 uppercase">Total Deployments</span>
            <span className="font-black text-4xl text-brutal-blue">
              <StatCounter targetValue={filteredProjects.length} hasIntersected={hasIntersected} />
            </span>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 mb-12 p-4 bg-white border-4 border-brutal-black shadow-brutal dark:bg-black">
          
          <div data-lenis-prevent className="flex items-center gap-2 overflow-x-auto flex-nowrap pb-2 lg:pb-0 scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style jsx>{`
              div::-webkit-scrollbar { display: none; }
            `}</style>
            {dynamicFilterTabs.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-black uppercase whitespace-nowrap border-2 border-brutal-black transition-all shadow-brutal-sm cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-black text-white dark:bg-white dark:text-black dark:border-white translate-y-1 translate-x-1 shadow-none'
                    : 'bg-white text-black hover:bg-zinc-100 dark:bg-black dark:text-white dark:hover:bg-zinc-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full lg:w-auto shrink-0 relative">
            <input
              type="text"
              placeholder="FILTER BY TECH..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full lg:w-64 px-4 py-3 bg-white border-4 border-brutal-black text-sm font-black text-brutal-black uppercase placeholder-brutal-black/50 focus:outline-none focus:bg-brutal-yellow transition-colors shadow-brutal-sm"
            />
          </div>

        </div>

        {/* Project Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const hasDemo = Boolean(project.demoUrl);
            const metrics = getMetrics(project.id);
            return (
              <div
                key={project.id}
                onClick={() => {
                  if (hasDemo) window.open(project.demoUrl, '_blank', 'noopener,noreferrer');
                  else onOpenDemo(project);
                }}
                className={`group brutal-card-hover flex flex-col justify-between cursor-pointer h-full bg-white dark:bg-black p-0 overflow-hidden card-reveal ${hasIntersected ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                
                {/* Generative Project Cover Art */}
                <ProjectCoverArt project={project} />

                <div className="p-6 bg-white border-b-4 border-brutal-black flex-1 dark:bg-black">
                  {/* Title & Description */}
                  <h3 className="font-display font-black text-3xl text-brutal-black mb-4 uppercase leading-none tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-base text-brutal-black font-bold uppercase leading-tight mb-6 line-clamp-3">
                    {project.desc}
                  </p>

                  {/* Quantifiable Metrics */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {metrics.map((m, i) => (
                      <div key={i} className="bg-pure-white text-black border-2 border-black dark:border-white flex flex-col items-center justify-center text-center p-1.5">
                        <span className="font-black text-[10px] text-black uppercase">{m.label}</span>
                        <span className="font-black text-lg text-black">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.stack && project.stack.map((tech, idx) => (
                      <span
                         key={idx}
                         className="font-black text-[10px] uppercase px-2 py-1 bg-white text-brutal-black border-2 border-brutal-black dark:bg-black"
                      >
                         {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 bg-white dark:bg-black">
                  <div className="grid grid-cols-2 gap-3">
                    {hasDemo ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.demoUrl, '_blank', 'noopener,noreferrer');
                        }}
                        className="btn-primary-invert py-3 justify-center text-xs cursor-pointer"
                      >
                        LIVE DEMO
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDemo(project);
                        }}
                        className="btn-secondary-invert py-3 justify-center text-xs cursor-pointer"
                      >
                        VIEW ARCH
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenInquiry({ title: `Technical Inquiry — ${project.title}` });
                      }}
                      className="btn-secondary-invert py-3 justify-center text-xs cursor-pointer"
                    >
                      MODIFY
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
