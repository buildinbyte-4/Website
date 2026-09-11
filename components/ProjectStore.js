'use client';
import { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '@/lib/data';
import ProjectCoverArt from './ProjectCoverArt';

function StatCounter({ targetValue, duration = 800, hasIntersected, suffix = '' }) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!hasIntersected) return;
    
    let start = 0;
    const end = parseInt(targetValue, 10) || 0;
    if (start === end) {
      setCurrentValue(end);
      return;
    }

    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const current = Math.floor(progress * end);
      setCurrentValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(end);
      }
    };

    requestAnimationFrame(animate);
  }, [hasIntersected, targetValue, duration]);

  return <>{currentValue}{suffix}</>;
}

export default function ProjectStore({ customProjects, onOpenDemo, onOpenInquiry }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasIntersected, setHasIntersected] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setHasIntersected(true);
        observer.disconnect();
      }
    }, { threshold: 0.05 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

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
    <section id="case-studies" ref={sectionRef} className="border-b border-slate-200 bg-transparent py-20 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="mb-3">
              <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">
                Production Work
              </span>
            </div>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Selected case studies
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-zinc-300">
              Production-ready software shaped around measurable business outcomes.
            </p>
          </div>

          <div className="select-none rounded-xl border border-slate-200 bg-white px-5 py-4 text-left shadow-sm dark:border-white/10 dark:bg-bg-surface-dark md:text-right">
            <span className="mb-1 block text-sm text-slate-500 dark:text-zinc-400">Projects shown</span>
            <span className="font-display text-3xl font-semibold text-primary">
              <StatCounter targetValue={filteredProjects.length} hasIntersected={hasIntersected} />
            </span>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-bg-surface-dark lg:flex-nowrap">
          
          <div data-lenis-prevent className="flex items-center gap-2 overflow-x-auto flex-nowrap pb-2 lg:pb-0 scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style jsx>{`
              div::-webkit-scrollbar { display: none; }
            `}</style>
            {dynamicFilterTabs.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full lg:w-auto shrink-0 relative">
            <input
              type="text"
              placeholder="Search by technology"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-foreground shadow-sm placeholder:text-slate-400 dark:border-white/10 dark:bg-canvas lg:w-64"
            />
          </div>

        </div>

        {/* Project Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const hasDemo = Boolean(project.demoUrl);
            const metrics = getMetrics(project.id);
            return (
              <article
                key={project.id}
                className={`group ui-card flex h-full flex-col justify-between p-0 card-reveal ${hasIntersected ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                
                {/* Generative Project Cover Art */}
                <ProjectCoverArt project={project} />

                <div className="flex-1 border-b border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-bg-surface-dark">
                  {/* Title & Description */}
                  <h3 className="mb-3 font-display text-2xl font-semibold tracking-tight text-foreground">
                    {project.title}
                  </h3>

                  <p className="mb-6 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-zinc-400">
                    {project.desc}
                  </p>

                  {/* Quantifiable Metrics */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {metrics.map((m, i) => (
                      <div key={i} className="flex flex-col items-center justify-center rounded-lg bg-slate-50 p-2 text-center dark:bg-white/5">
                        <span className="text-xs text-slate-500 dark:text-zinc-400">{m.label}</span>
                        <span className="text-base font-semibold text-slate-900 dark:text-foreground">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.stack && project.stack.map((tech, idx) => (
                      <span
                         key={idx}
                         className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-bg-surface-dark dark:text-zinc-300"
                      >
                         {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 bg-white dark:bg-bg-surface-dark">
                  <div className="grid grid-cols-2 gap-3">
                    {hasDemo ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary-invert py-3 justify-center text-xs cursor-pointer"
                      >
                        Live demo
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDemo(project);
                        }}
                        className="btn-secondary-invert py-3 justify-center text-xs cursor-pointer"
                      >
                        View architecture
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
                      Customize
                    </button>
                  </div>
                </div>

              </article>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-bg-surface-dark p-10 text-center">
            <h3 className="text-xl font-bold text-foreground">No matching projects</h3>
            <p className="mt-2 text-slate-500">Try another category or technology keyword.</p>
            <button type="button" onClick={() => { setActiveCategory('All'); setSearchQuery(''); }} className="btn-secondary mt-5">Clear filters</button>
          </div>
        )}

      </div>
    </section>
  );
}
