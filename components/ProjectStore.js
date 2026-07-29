'use client';
import { useState } from 'react';
import { PROJECTS, FILTER_TABS } from '@/lib/data';

export default function ProjectStore({ customProjects, onOpenDemo, onOpenInquiry }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const displayList = customProjects && customProjects.length > 0 ? customProjects : PROJECTS;

  const filteredProjects = displayList.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.stack.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#800020] bg-[#800020]/10 px-3 py-1 rounded-full border border-[#800020]/20 inline-block mb-3">
              Solutions We Build
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#4A0E17]">
              Solutions We Build
            </h2>
            <p className="text-sm text-[#5C4B3E] mt-1 max-w-xl">
              Explore examples of software solutions we design and develop for businesses across multiple industries. Every solution is fully customizable to match your unique business requirements.
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-[#8C7B6E] block">Available Solutions</span>
            <span className="font-serif font-bold text-2xl text-[#800020]">
              {filteredProjects.length} Solutions
            </span>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 p-3 rounded-2xl bg-[#FFFDF9] border border-[#800020]/15 shadow-sm">
          
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {FILTER_TABS.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-[#800020] text-[#FDFBF7] shadow-sm'
                    : 'bg-transparent text-[#2C1D11] hover:bg-[#F5EFEB]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search solutions..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 rounded-xl bg-[#F4EBE1] border border-[#E2D7C7] text-xs text-[#2C1D11] focus:outline-none focus:border-[#800020]"
            />
          </div>

        </div>

        {/* Project Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => {
            return (
              <div
                key={project.id}
                className="editorial-card p-6 flex flex-col justify-between border border-[#800020]/15 bg-[#FFFDF9]"
              >
                <div>
                  
                  {/* Visual Graphic Placeholder with Hover Overlay */}
                  <div className="rounded-xl overflow-hidden aspect-[16/9] bg-[#F4EBE1] border border-[#E2D7C7] mb-5 p-4 flex flex-col justify-between relative group">
                    <div className="flex items-center justify-between">
                      <span className="badge-available">
                        {project.status}
                      </span>
                      <span className="text-[11px] font-bold text-[#800020] uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>

                    {/* Default Graphic UI Preview */}
                    <div className="bg-[#FFFDF9] p-3 rounded-lg border border-[#E2D7C7] shadow-sm transition-opacity duration-300 group-hover:opacity-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#800020]"></div>
                        <div className="h-2 w-24 bg-[#2C1D11]/20 rounded"></div>
                      </div>
                      <div className="h-2.5 w-full bg-[#800020]/15 rounded"></div>
                    </div>

                    {/* Hover Overlay: Feature Checklist */}
                    <div className="absolute inset-0 bg-[#800020]/95 rounded-xl flex flex-col justify-center px-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#FDFBF7]/60 mb-3">What's Included</p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-xs font-semibold text-[#FDFBF7]">
                          <span className="text-[#F4EBE1] font-bold">✓</span> Fully Customizable
                        </li>
                        <li className="flex items-center gap-2 text-xs font-semibold text-[#FDFBF7]">
                          <span className="text-[#F4EBE1] font-bold">✓</span> Scalable Architecture
                        </li>
                        <li className="flex items-center gap-2 text-xs font-semibold text-[#FDFBF7]">
                          <span className="text-[#F4EBE1] font-bold">✓</span> Modern UI/UX
                        </li>
                        <li className="flex items-center gap-2 text-xs font-semibold text-[#FDFBF7]">
                          <span className="text-[#F4EBE1] font-bold">✓</span> Deployment Support
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Industry Tag */}
                  {project.industry && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7B6E] mb-2 block">
                      {project.industry}
                    </span>
                  )}

                  {/* Title & Description */}
                  <h3 className="font-serif font-bold text-xl text-[#4A0E17] mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[#5C4B3E] leading-relaxed mb-5 line-clamp-2">
                    {project.desc}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.stack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-[#F5EFEB] text-[#2C1D11] border border-[#E2D7C7]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Footer Action Buttons */}
                <div className="pt-4 border-t border-[#800020]/12">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-bold text-[#8C7B6E]">Tailored to Your Business</span>
                    <span className="text-[10px] font-bold text-[#800020] bg-[#800020]/10 px-2 py-1 rounded border border-[#800020]/20 uppercase tracking-wide">
                      Ready to Customize
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => onOpenDemo(project)}
                      className="btn-secondary text-xs py-2.5 justify-center"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => onOpenInquiry({ title: `Request a Quote — ${project.title}` })}
                      className="btn-primary text-xs py-2.5 justify-center"
                    >
                      Request a Quote
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
