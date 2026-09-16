'use client';
import { useState, useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';
import { OFFERING_TYPES } from '@/lib/projectCatalog';

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

export default function ProjectStore({ customProjects, isLoading = false, loadError = null, onRetry, onOpenDemo, onOpenInquiry }) {
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

  const displayList = Array.isArray(customProjects) ? customProjects : [];
  const dynamicFilterTabs = ['All', ...Array.from(new Set(displayList.map((project) => project.category).filter(Boolean)))];

  const filteredProjects = displayList.filter((project) => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const matchesSearch = String(project.title).toLowerCase().includes(normalizedSearch) ||
                          String(project.desc).toLowerCase().includes(normalizedSearch) ||
                          project.stack?.some((technology) => String(technology).toLowerCase().includes(normalizedSearch));
    return matchesCategory && matchesSearch;
  });

  const offeringGroups = [
    {
      id: 'custom-systems',
      title: 'Custom Systems',
      description: 'Purpose-built applications, operational platforms, and internal tools shaped around a specific workflow.',
      projects: filteredProjects.filter((project) => project.offeringType === OFFERING_TYPES.CUSTOM_SYSTEM),
    },
    {
      id: 'website-templates',
      title: 'Website Templates',
      description: 'Ready-to-customize starting points with live previews for faster website launches.',
      projects: filteredProjects.filter((project) => project.offeringType === OFFERING_TYPES.WEBSITE_TEMPLATE),
    },
  ];

  return (
    <section id="case-studies" ref={sectionRef} className="border-b border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-canvas">
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
              Custom systems &amp; website templates
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-zinc-300">
              Explore purpose-built software and ready-to-customize website foundations, clearly organized by engagement type.
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
              aria-label="Search projects by name, description, or technology"
              placeholder="Search by technology"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-foreground shadow-sm placeholder:text-slate-400 dark:border-white/10 dark:bg-canvas lg:w-64"
            />
          </div>

        </div>

        {loadError && displayList.length === 0 && (
          <div role="alert" className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/40 dark:bg-red-950/20">
            <h3 className="text-lg font-semibold text-foreground">Projects could not be loaded</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400">The live catalog is temporarily unavailable.</p>
            {onRetry && <button type="button" onClick={onRetry} className="btn-secondary mt-4">Try again</button>}
          </div>
        )}

        {isLoading && displayList.length === 0 && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading projects">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} aria-hidden="true" className="ui-card h-96 animate-pulse bg-slate-100 dark:bg-white/5" />
            ))}
          </div>
        )}

        {!isLoading && filteredProjects.length > 0 && (
          <div className="space-y-16">
            {offeringGroups.map((group) => group.projects.length > 0 && (
              <section key={group.id} aria-labelledby={`${group.id}-heading`}>
                <div className="mb-7 flex flex-col justify-between gap-3 border-b border-slate-200 pb-5 dark:border-white/10 sm:flex-row sm:items-end">
                  <div>
                    <h3 id={`${group.id}-heading`} className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {group.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-zinc-400">
                      {group.description}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-slate-500 dark:text-zinc-400">
                    {group.projects.length} {group.projects.length === 1 ? 'project' : 'projects'}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {group.projects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      isVisible={hasIntersected}
                      onOpenDemo={onOpenDemo}
                      onOpenInquiry={onOpenInquiry}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {!isLoading && !loadError && displayList.length === 0 && (
          <div role="status" className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-bg-surface-dark p-10 text-center">
            <h3 className="text-xl font-bold text-foreground">No projects are published yet</h3>
            <p className="mt-2 text-slate-500">Please check back soon for new case studies.</p>
          </div>
        )}

        {!isLoading && displayList.length > 0 && filteredProjects.length === 0 && (
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
