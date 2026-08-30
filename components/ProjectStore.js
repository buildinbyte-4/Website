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
    <section id="products" className="py-24 bg-canvas border-t border-line">
      <div className="page-wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="label-meta mb-3">Selected work</p>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl text-ink tracking-tight">
              Featured solutions & engineering work
            </h2>
          </div>

          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder="Search stack, title, or IoT…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-line">
          {dynamicFilterTabs.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors duration-atelier border ${
                  isSelected
                    ? 'border-accent text-accent'
                    : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="atelier-card overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative h-48 bg-footer overflow-hidden border-b border-line">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ProjectCoverArt category={project.category} title={project.title} />
                )}
                <div className="absolute top-3 left-3">
                  <span className="atelier-chip bg-surface/90">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-display font-semibold text-xl text-ink group-hover:text-accent transition-colors duration-atelier mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted line-clamp-3 leading-relaxed">
                    {project.desc}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {project.stack && project.stack.map((stk, sIdx) => (
                    <span key={sIdx} className="atelier-chip">
                      {stk}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-line flex items-center justify-between gap-3">
                  <button
                    onClick={() => onOpenDemo(project)}
                    className="flex-1 btn-ghost py-2 text-xs"
                  >
                    Live demo
                  </button>
                  <button
                    onClick={() => onOpenInquiry({ title: `Inquiry: ${project.title}` })}
                    className="flex-1 btn-primary py-2 text-xs"
                  >
                    Custom quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="border border-line p-12 text-center my-8 bg-surface">
            <p className="text-base text-muted">No engineering products match your current query.</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-4 btn-ghost px-4 py-2 text-xs"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
