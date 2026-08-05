'use client';
import { useState } from 'react';
import { PROJECTS, FILTER_TABS } from '@/lib/data';

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

  const getMetrics = (id) => {
    const defaultMetrics = [
      { label: 'Latency', value: '-40%' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Load', value: '< 1s' }
    ];
    if (id % 3 === 0) return [{ label: 'Conv.', value: '+45%' }, { label: 'Speed', value: '0.8s' }, { label: 'API', value: '1M+' }];
    if (id % 2 === 0) return [{ label: 'Sync', value: '<50ms' }, { label: 'Ret.', value: '+22%' }, { label: 'Up', value: '99.99%' }];
    return defaultMetrics;
  };



  return (
    <section id="case-studies" className="py-20 bg-brutal-bg border-b-4 border-brutal-black">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-black text-xs uppercase tracking-widest text-brutal-black bg-brutal-yellow px-3 py-1 border-2 border-brutal-black inline-block mb-4 shadow-brutal-sm">
              Production Work
            </span>
            <h2 className="font-display text-5xl sm:text-6xl font-black text-brutal-black uppercase tracking-tighter leading-none">
              CASE STUDIES
            </h2>
            <p className="text-xl text-brutal-black mt-4 max-w-2xl font-bold uppercase">
              Real-world software solutions architected for scale. We deliver measurable results.
            </p>
          </div>

          <div className="text-right border-4 border-brutal-black p-4 bg-white shadow-brutal-sm">
            <span className="font-black text-sm text-brutal-black block mb-1 uppercase">Total Deployments</span>
            <span className="font-black text-4xl text-brutal-blue">
              {filteredProjects.length}
            </span>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 mb-12 p-4 bg-white border-4 border-brutal-black shadow-brutal">
          
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
                className="group editorial-card flex flex-col justify-between cursor-pointer h-full bg-white p-0 overflow-hidden"
              >
                
                {/* Header: Meta & Industry */}
                <div className="flex items-center justify-between p-4 border-b-4 border-brutal-black bg-white">
                  <span className="font-black text-sm text-brutal-black uppercase">
                    ID:{String(project.id).padStart(4, '0')}
                  </span>
                  {project.industry && (
                    <span className="font-black text-xs uppercase text-white bg-brutal-black px-2 py-1">
                      {project.industry}
                    </span>
                  )}
                </div>

                <div className="p-6 bg-white border-b-4 border-brutal-black flex-1">
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
                      <div key={i} className="bg-pure-white text-black border-2 border-black dark:border-white flex flex-col items-center justify-center text-center">
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
                         className="font-black text-[10px] uppercase px-2 py-1 bg-white text-brutal-black border-2 border-brutal-black"
                      >
                         {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 bg-white">
                  <div className="grid grid-cols-2 gap-3">
                    {hasDemo ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.demoUrl, '_blank', 'noopener,noreferrer');
                        }}
                        className="btn-primary py-3 justify-center text-xs"
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
                        className="btn-secondary py-3 justify-center text-xs"
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
                      className="btn-secondary py-3 justify-center text-xs hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
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
