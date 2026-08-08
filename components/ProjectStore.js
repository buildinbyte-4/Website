'use client';
import { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '@/lib/data';

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

  const renderMockup = (project) => {
    const title = (project.title || '').toLowerCase();
    
    // Custom mockups representing the template types
    if (title.includes('hotel') || title.includes('hospitality')) {
      return (
        <div className="w-full h-36 bg-zinc-950 text-white p-3 flex flex-col justify-between font-sans border-b-4 border-brutal-black relative overflow-hidden select-none">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-1.5">
            <span className="text-[10px] font-black tracking-widest text-[#0066FF]">AURELIA GRAND</span>
            <span className="text-[8px] bg-[#FFE800] text-black px-1.5 font-bold uppercase">5 STAR</span>
          </div>
          <div className="my-auto text-left">
            <div className="text-sm font-black leading-tight uppercase font-display">Refined Luxury</div>
            <div className="text-[7px] text-zinc-400 mt-1 uppercase max-w-[80%] leading-normal">
              Ocean suite rooms starting from $450/night. Integrated wellness spa.
            </div>
          </div>
          <div className="flex justify-between items-center text-[7px] border-t border-zinc-800 pt-1.5 text-zinc-500 font-mono">
            <span>ROOMS AVAILABLE: 14</span>
            <span className="text-[#00FF41]">● ONLINE BOOKING</span>
          </div>
        </div>
      );
    } else if (title.includes('real estate') || title.includes('property')) {
      return (
        <div className="w-full h-36 bg-zinc-50 text-black p-3 flex flex-col justify-between font-sans border-b-4 border-brutal-black relative overflow-hidden select-none dark:bg-zinc-900 dark:text-white">
          <div className="flex justify-between items-center">
            <span className="text-[8px] bg-zinc-900 text-white dark:bg-white dark:text-black px-1.5 font-bold uppercase">FOR SALE</span>
            <span className="text-[10px] font-black text-zinc-800 dark:text-zinc-200 font-mono">$1,249,000</span>
          </div>
          <div className="my-2 border-2 border-dashed border-zinc-300 dark:border-zinc-700 p-1 bg-white dark:bg-zinc-950 flex gap-2 items-center">
            <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-800 border border-black flex items-center justify-center text-sm shrink-0">🏠</div>
            <div className="text-left leading-none">
              <span className="text-[8px] font-black uppercase block">The Oakwood Estate</span>
              <span className="text-[7px] text-zinc-500 uppercase mt-0.5 block">5 BED • 4 BATH • 4,200 SQFT</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-[7px] text-zinc-500 font-mono">
            <span>LOC: PORTLAND, OR</span>
            <span className="text-[#0066FF] font-bold">VIEW DETAILS →</span>
          </div>
        </div>
      );
    } else if (title.includes('elecstore') || title.includes('electronics') || title.includes('commerce') || title.includes('market') || title.includes('store') || title.includes('shop')) {
      return (
        <div className="w-full h-36 bg-white text-black p-3 flex flex-col justify-between font-sans border-b-4 border-brutal-black relative overflow-hidden select-none dark:bg-zinc-950 dark:text-white">
          <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-1.5">
            <span className="text-[9px] font-black tracking-widest uppercase">ELECSTORE.NET</span>
            <span className="text-[8px] bg-red-600 text-white px-1.5 font-bold uppercase">-15% OFF</span>
          </div>
          <div className="grid grid-cols-2 gap-2 my-auto">
            <div className="border border-zinc-200 dark:border-zinc-800 p-1.5 bg-zinc-50 dark:bg-zinc-900 text-center flex flex-col items-center">
              <span className="text-xs">🎧</span>
              <span className="text-[7px] font-bold mt-1 uppercase block truncate max-w-full">Pro Headset</span>
              <span className="text-[8px] font-black text-blue-600 dark:text-blue-400 mt-0.5">$89.00</span>
            </div>
            <div className="border border-zinc-200 dark:border-zinc-800 p-1.5 bg-zinc-50 dark:bg-zinc-900 text-center flex flex-col items-center">
              <span className="text-xs">⌚</span>
              <span className="text-[7px] font-bold mt-1 uppercase block truncate max-w-full">Smartwatch</span>
              <span className="text-[8px] font-black text-blue-600 dark:text-blue-400 mt-0.5">$199.00</span>
            </div>
          </div>
          <div className="text-[6px] text-zinc-400 uppercase text-center font-mono tracking-widest mt-1">
            SECURE CHECKOUT ENABLED
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full h-36 bg-zinc-950 text-white p-3 flex flex-col justify-between font-sans border-b-4 border-brutal-black relative overflow-hidden select-none">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-1.5">
            <span className="text-[10px] font-black tracking-widest uppercase text-emerald-400">INSTITUTIONAL CORE</span>
            <span className="text-[8px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 font-bold uppercase">ACCREDITED</span>
          </div>
          <div className="my-auto text-left space-y-1">
            <div className="text-xs font-black uppercase text-zinc-100">Portal Main Dashboard</div>
            <div className="h-1 bg-zinc-800 w-full rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 w-[78%]"></div>
            </div>
            <div className="flex justify-between text-[7px] text-zinc-500 uppercase font-mono">
              <span>Server Uptime: 99.98%</span>
              <span>78% complete</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-[7px] border-t border-zinc-800 pt-1.5 text-zinc-500 font-mono">
            <span>SCSVMV SYSTEMS</span>
            <span className="text-emerald-400">● SECURE SYNC</span>
          </div>
        </div>
      );
    }
  };

  return (
    <section id="case-studies" ref={sectionRef} className="py-20 bg-brutal-bg border-b-4 border-brutal-black">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="overflow-hidden mb-4">
              <span 
                className="font-black text-xs uppercase tracking-widest text-brutal-black bg-brutal-yellow px-3 py-1 border-2 border-brutal-black inline-block shadow-brutal-sm"
                style={{
                  transform: hasIntersected ? 'translateX(0)' : 'translateX(-101%)',
                  transition: 'transform 300ms linear',
                }}
              >
                Production Work
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
                
                {/* macOS Browser Header */}
                <div className="border-b-4 border-brutal-black bg-zinc-100 dark:bg-zinc-900 p-3 flex items-center justify-between shrink-0 select-none">
                  <div className="flex gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 border border-brutal-black"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 border border-brutal-black"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 border border-brutal-black"></div>
                  </div>
                  <div className="bg-white dark:bg-black border-2 border-brutal-black text-[9px] font-mono px-2 py-0.5 rounded text-zinc-500 uppercase select-none overflow-hidden truncate max-w-[60%] shrink-0">
                    {project.industry ? project.industry.toLowerCase() : 'custom'}_system.bin
                  </div>
                  <div className="w-8 shrink-0"></div>
                </div>

                {/* Structured Preview Mockup */}
                {renderMockup(project)}

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
