'use client';

import Head from 'next/head';
import { useEffect } from 'react';

export default function NewUIPage() {
  useEffect(() => {
    // Simple intersection observer for timeline nodes to add glowing active state
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          entry.target.classList.remove('bg-surface-container-high');
        } else {
          entry.target.classList.remove('active');
          entry.target.classList.add('bg-surface-container-high');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, { threshold: 0.5 });
    const nodes = document.querySelectorAll('.timeline-node');
    nodes.forEach(node => observer.observe(node));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>BuildInByte | Engineering Businesses Through Technology</title>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com" rel="preconnect"/>
        <link href="https://fonts.gstatic.com" rel="preconnect"/>
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&amp;family=Inter:wght@400;500;600&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap" rel="stylesheet"/>
        <script id="tailwind-config">
          {`
            tailwind.config = {
              darkMode: "class",
              theme: {
                extend: {
                  "colors": {
                    "primary-container": "#06b6d4",
                    "surface-container": "#171f33",
                    "on-secondary": "#3c0091",
                    "on-secondary-container": "#c4abff",
                    "primary-fixed": "#acedff",
                    "error": "#ffb4ab",
                    "on-primary-container": "#00424f",
                    "on-primary-fixed": "#001f26",
                    "on-tertiary-fixed-variant": "#6a3b00",
                    "on-surface": "#dae2fd",
                    "tertiary-fixed": "#ffdcbf",
                    "surface-container-low": "#131b2e",
                    "secondary-container": "#571bc1",
                    "on-tertiary": "#4b2800",
                    "outline-variant": "#3d494c",
                    "tertiary-fixed-dim": "#ffb873",
                    "on-primary-fixed-variant": "#004e5c",
                    "primary": "#4cd7f6",
                    "surface-container-high": "#222a3d",
                    "inverse-on-surface": "#283044",
                    "on-tertiary-container": "#5b3200",
                    "surface": "#0b1326",
                    "surface-tint": "#4cd7f6",
                    "inverse-primary": "#00687a",
                    "on-primary": "#003640",
                    "on-error": "#690005",
                    "surface-bright": "#31394d",
                    "surface-variant": "#2d3449",
                    "tertiary": "#ffb873",
                    "surface-container-highest": "#2d3449",
                    "primary-fixed-dim": "#4cd7f6",
                    "surface-dim": "#0b1326",
                    "secondary-fixed-dim": "#d0bcff",
                    "on-secondary-fixed-variant": "#5516be",
                    "secondary-fixed": "#e9ddff",
                    "on-error-container": "#ffdad6",
                    "secondary": "#d0bcff",
                    "tertiary-container": "#e89337",
                    "on-secondary-fixed": "#23005c",
                    "on-background": "#dae2fd",
                    "error-container": "#93000a",
                    "outline": "#869397",
                    "on-tertiary-fixed": "#2d1600",
                    "background": "#0b1326",
                    "inverse-surface": "#dae2fd",
                    "on-surface-variant": "#bcc9cd",
                    "surface-container-lowest": "#060e20"
                  },
                  "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
                  },
                  "spacing": {
                    "margin-desktop": "80px",
                    "unit": "4px",
                    "margin-mobile": "20px",
                    "gutter": "24px",
                    "container-max": "1280px"
                  },
                  "fontFamily": {
                    "code-sm": ["JetBrains Mono", "monospace"],
                    "display-lg": ["Geist", "sans-serif"],
                    "headline-md": ["Geist", "sans-serif"],
                    "label-caps": ["JetBrains Mono", "monospace"],
                    "headline-lg": ["Geist", "sans-serif"],
                    "headline-lg-mobile": ["Geist", "sans-serif"],
                    "body-md": ["Inter", "sans-serif"],
                    "body-lg": ["Inter", "sans-serif"]
                  },
                  "fontSize": {
                    "code-sm": ["13px", { "lineHeight": "1.5", "fontWeight": "400" }],
                    "display-lg": ["64px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                    "headline-md": ["24px", { "lineHeight": "1.4", "fontWeight": "500" }],
                    "label-caps": ["12px", { "lineHeight": "1.0", "letterSpacing": "0.1em", "fontWeight": "500" }],
                    "headline-lg": ["40px", { "lineHeight": "1.2", "fontWeight": "600" }],
                    "headline-lg-mobile": ["32px", { "lineHeight": "1.2", "fontWeight": "600" }],
                    "body-md": ["16px", { "lineHeight": "1.5", "fontWeight": "400" }],
                    "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }]
                  }
                }
              }
            };
          `}
        </script>
        <style>
          {`
            body {
                background-color: #0f172a; /* Base Layer */
                color: theme('colors.on-surface');
                overflow-x: hidden;
            }

            .glass-panel {
                background-color: rgba(15, 23, 42, 0.5); /* Slate with opacity */
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                border-left: 1px solid rgba(255, 255, 255, 0.1);
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                border-right: 1px solid rgba(255, 255, 255, 0.05);
            }

            .glow-hover:hover {
                box-shadow: 0 0 20px rgba(6, 182, 212, 0.2); /* Cyan glow */
            }

            .glow-hover-violet:hover {
                box-shadow: 0 0 20px rgba(196, 171, 255, 0.2); /* Violet glow */
            }

            .timeline-node {
                transition: all 0.3s ease;
            }
            .timeline-node.active {
                box-shadow: 0 0 15px rgba(6, 182, 212, 0.5);
                background-color: theme('colors.primary');
            }

            .tech-bg {
                background-image:
                    linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.95)),
                    url('https://lh3.googleusercontent.com/aida-public/AB6AXuCMO49Ji-kCxPm6_Dxh6jlci-H3UXYBEnzECq2sYez9RR2lKLLVtm5K2JfL4Tq4gVNGkadfRfNSAq7mSfX5B7cTWv1Kq1hl3P5fqsvVVC5v6OPQgfvCv418epUmApO15z46dHvYC4-EM5DbQb2IxCleM60lFwLxOlH8XD00W2inxmQIgUZQXN5A578UfmzXE-R0Yez6nzbFbnajB-N9LbYZAWcdWYCoNglxptJQxvZb3beLZ3VNaW_kj4edTrqTI60zMxAFpbivJuE');
                background-size: cover;
                background-position: center;
                background-attachment: fixed;
            }

            /* Form Inputs */
            input:focus, textarea:focus {
                border-color: theme('colors.primary') !important;
                box-shadow: none !important;
                border-bottom-width: 2px !important;
            }
          `}
        </style>
      </Head>
      <body className="font-body-md antialiased tech-bg selection:bg-primary/30 selection:text-primary-fixed">
        {/* TopNavBar (Shared Component) */}
        <nav className="fixed top-0 w-full z-50 bg-surface/50 dark:bg-surface/50 backdrop-blur-xl border-b border-white/10 shadow-none">
          <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-20">
            {/* Brand */}
            <a className="flex items-center gap-2 group" href="#">
              <img alt="BuildInByte Logo" className="w-10 h-10 rounded-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMjLBoDO1r2vvTHvU_16-88X4EBjb5U8CIyUNsRziKNuYbEeeNfKFGcjnVnZeuESuB_tNlEEeBIiEWLyPF2I5TjvF4cyXKXqV1q6TC2NzAP1hFx4gPpjt8Ou-UBjOnFLeDTUiHV8Nvy4mniPaFSSZqDRQTbsqCDRXeJcHee2v_YQiXmC8uJNPjpejAcdLwaRvIM9fkkwa9GXCeauFNbGcSg5R3zJX89Qdb7pWJxdhXOT1NlLwmwgGVh5ae5MkAJ9TlUfhMH5UYyzM"/>
              <span className="font-display-lg text-headline-md font-bold text-primary tracking-tight">BuildInByte</span>
            </a>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors py-2" href="#solutions">Solutions</a>
              <a className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors py-2" href="#showcase">Showcase</a>
              <a className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors py-2" href="#process">Process</a>
              <a className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors py-2" href="#contact">Contact</a>
            </div>
            {/* Trailing Action */}
            <div className="hidden md:flex">
              <button className="bg-primary text-on-primary font-label-caps text-label-caps px-6 py-3 rounded hover:bg-primary-fixed transition-all duration-300 uppercase tracking-widest flex items-center gap-2">
                Let's Build <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>arrow_forward</span>
              </button>
            </div>
            {/* Mobile Menu Toggle (Decorative for this scope) */}
            <button className="md:hidden text-primary">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </nav>
        {/* Main Content Canvas */}
        <main className="pt-32 pb-24 space-y-[120px]">
          {/* Hero Section */}
          <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center min-h-[70vh]">
              <div className="lg:col-span-8 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="font-label-caps text-label-caps text-primary uppercase">Precision Engineering</span>
                </div>
                <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface max-w-4xl">
                  Engineering Businesses Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Technology</span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                  We architects high-performance hardware and resilient software systems for enterprises demanding rigorous logic and future-forward innovation.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button className="bg-primary text-on-primary font-label-caps text-label-caps px-8 py-4 rounded hover:bg-primary-fixed transition-all duration-300 uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                    Initialize Project <span className="material-symbols-outlined">terminal</span>
                  </button>
                  <button className="glass-panel border border-primary text-primary font-label-caps text-label-caps px-8 py-4 rounded hover:bg-primary/10 transition-all duration-300 uppercase tracking-widest flex items-center gap-2">
                    View Documentation
                  </button>
                </div>
              </div>
            </div>
          </section>
          {/* Solutions Section */}
          <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10" id="solutions">
            <div className="mb-16">
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">Core Competencies</h2>
              <div className="w-20 h-1 bg-primary rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {/* Hardware Card */}
              <div className="glass-panel rounded-xl p-8 glow-hover group cursor-pointer h-full flex flex-col">
                <div className="w-14 h-14 rounded bg-primary/10 flex items-center justify-center mb-8 border border-primary/30 group-hover:border-primary transition-colors">
                  <span className="material-symbols-outlined text-primary text-3xl">memory</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Hardware Engineering</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8 flex-grow">
                  Design and fabrication of high-fidelity IoT devices, custom PCBs, and edge-computing nodes. Precision manufacturing with rigorous thermal and stress testing protocols.
                </p>
                <div className="mt-auto border-t border-white/5 pt-6 flex flex-wrap gap-2">
                  <span className="font-code-sm text-code-sm text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">Altium</span>
                  <span className="font-code-sm text-code-sm text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">Verilog</span>
                  <span className="font-code-sm text-code-sm text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">IoT</span>
                </div>
              </div>
              {/* Software Card */}
              <div className="glass-panel rounded-xl p-8 glow-hover-violet group cursor-pointer h-full flex flex-col">
                <div className="w-14 h-14 rounded bg-secondary/10 flex items-center justify-center mb-8 border border-secondary/30 group-hover:border-secondary transition-colors">
                  <span className="material-symbols-outlined text-secondary text-3xl">code_blocks</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Software Systems</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8 flex-grow">
                  Resilient, highly-concurrent distributed systems and cloud infrastructure. We build the logic gates that power enterprise scale applications with zero-downtime architecture.
                </p>
                <div className="mt-auto border-t border-white/5 pt-6 flex flex-wrap gap-2">
                  <span className="font-code-sm text-code-sm text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">Rust</span>
                  <span className="font-code-sm text-code-sm text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">Kubernetes</span>
                  <span className="font-code-sm text-code-sm text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">gRPC</span>
                </div>
              </div>
            </div>
          </section>
          {/* Product Showcase Grid */}
          <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10" id="showcase">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">Deployed Systems</h2>
                <div className="w-20 h-1 bg-primary rounded-full"></div>
              </div>
              <button className="hidden md:flex text-primary font-label-caps text-label-caps uppercase tracking-widest items-center gap-2 hover:text-primary-fixed transition-colors">
                View Registry <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
              {/* Featured Large */}
              <div className="md:col-span-8 glass-panel rounded-xl overflow-hidden group hover:border-primary transition-colors duration-500 min-h-[400px] flex flex-col relative">
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-10"></div>
                <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-500" data-alt="A macro shot of a sophisticated computer motherboard glowing with cyan and violet LED traces in a dark, high-tech laboratory setting. Precision engineering aesthetic." style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCy4bzqbuv7eA87kqTrQ5jW914Uu14aZtKd1Co1ev9hH9b_fVZcwC4oASff6jYV3Xkb1kwYpge5HQ1MnDUEph29oi2jlAclhtGJKSkHTxBTXDLac3u5CaFlOfeQikalsUsDjeuWY5DJpkcDvaMzRIKgzavWyhQeW3do1JkE_7lcbpJkTbArzSqH64YJh46yaRDIvaD6voOCI88OQPr9B5o1aiJthuVJZQ8RZ07s_jNHjXNyxnFjsG12oV3keBDooHQbrHe9-5r5dBc')"}}>
                </div>
                <div className="relative z-20 mt-auto p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-label-caps text-label-caps text-secondary uppercase bg-secondary/10 px-2 py-1 rounded border border-secondary/20">Phase 4</span>
                    <span className="font-code-sm text-code-sm text-on-surface-variant">SYS_ID: 9942</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Neural Edge Processor</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mb-6">Custom ASIC design for on-device machine learning inference, reducing latency by 400% compared to cloud counterparts.</p>
                </div>
              </div>
              {/* Secondary Small */}
              <div className="md:col-span-4 glass-panel rounded-xl overflow-hidden group hover:border-primary transition-colors duration-500 min-h-[400px] flex flex-col relative">
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent z-10"></div>
                <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-500" data-alt="Abstract 3D rendering of data flowing through fiber optic cables, illuminated in bright cyan against a pitch black background, symbolizing high-speed software architecture." style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCdSNmSKYD_R7ssXBRoIP9Cr2l5bM65-SGyxYz0xQXmn0j04ALUXyzODni6j9UCXZOhC5VZphybnf4JicPcAUMYjFvyXDMICvE132m2oT0W8bN0YjH_9scPRep_HNLrkxL_euqFu7Ws0pHwM4umlkzg6mQPLvCRdpqDTveeeKcomGv-vIVc78cYTvu4n_zQHSIuWcVW3SrvFhzZs5a-XNBGFzvBlnxvyExUaLMqBU-nkcU4dOJotk_WjHdBl6Jd-vdRjjajmXztbYA')"}}>
                </div>
                <div className="relative z-20 mt-auto p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-label-caps text-label-caps text-primary uppercase bg-primary/10 px-2 py-1 rounded border border-primary/20">Active</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2">OmniGrid API</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">High-throughput microservices mesh handling 10M+ RPM.</p>
                </div>
              </div>
            </div>
          </section>
          {/* Lead Inquiry Form */}
          <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10" id="contact">
            <div className="glass-panel rounded-xl p-8 md:p-12 relative overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                <div>
                  <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">Initialize Inquiry</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-8">Submit your project parameters. Our engineering team will review the technical specifications and establish a secure comm link within 24 hours.</p>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary">terminal</span>
                      <span className="font-code-sm text-code-sm">sys.ping("buildinbyte.com")</span>
                    </div>
                    <div className="flex items-center gap-4 text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary">encrypted</span>
                      <span className="font-code-sm text-code-sm">End-to-End Encrypted Channel</span>
                    </div>
                  </div>
                </div>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">Entity Name</label>
                      <input className="w-full bg-[#020617] border-0 border-b border-white/10 text-on-surface font-body-md px-4 py-3 focus:ring-0 transition-colors" placeholder="Acme Corp" type="text"/>
                    </div>
                    <div>
                      <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">Comm Link (Email)</label>
                      <input className="w-full bg-[#020617] border-0 border-b border-white/10 text-on-surface font-body-md px-4 py-3 focus:ring-0 transition-colors" placeholder="lead@acme.com" type="email"/>
                    </div>
                  </div>
                  <div>
                    <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">Project Classification</label>
                    <select className="w-full bg-[#020617] border-0 border-b border-white/10 text-on-surface font-body-md px-4 py-3 focus:ring-0 transition-colors appearance-none">
                      <option>Hardware Fabrication</option>
                      <option>Software Architecture</option>
                      <option>Full-Stack Systems Integration</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase mb-2">Technical Specifications</label>
                    <textarea className="w-full bg-[#020617] border-0 border-b border-white/10 text-on-surface font-body-md px-4 py-3 focus:ring-0 transition-colors resize-none" placeholder="Describe the scope and requirements..." rows="4"></textarea>
                  </div>
                  <button className="w-full bg-primary text-on-primary font-label-caps text-label-caps px-8 py-4 rounded hover:bg-primary-fixed transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2" type="button">
                    Execute Transmission <span className="material-symbols-outlined">send</span>
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>
        {/* Footer (Shared Component) */}
        <footer className="bg-surface-container-lowest dark:bg-surface-container-lowest border-t border-white/5 w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-20 max-w-container-max mx-auto">
            {/* Brand Column */}
            <div className="col-span-1 md:col-span-1 space-y-4">
              <a className="flex items-center gap-2 group mb-6" href="#">
                <img alt="BuildInByte Logo" className="w-8 h-8 rounded-sm grayscale group-hover:grayscale-0 transition-all" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMjLBoDO1r2vvTHvU_16-88X4EBjb5U8CIyUNsRziKNuYbEeeNfKFGcjnVnZeuESuB_tNlEEeBIiEWLyPF2I5TjvF4cyXKXqV1q6TC2NzAP1hFx4gPpjt8Ou-UBjOnFLeDTUiHV8Nvy4mniPaFSSZqDRQTbsqCDRXeJcHee2v_YQiXmC8uJNPjpejAcdLwaRvIM9fkkwa9GXCeauFNbGcSg5R3zJX89Qdb7pWJxdhXOT1NlLwmwgGVh5ae5MkAJ9TlUfhMH5UYyzM"/>
                <span className="font-display-lg text-headline-md font-bold text-primary">BuildInByte</span>
              </a>
              <p className="font-code-sm text-code-sm text-on-surface-variant">
                Engineering Businesses Through Technology.
              </p>
              <div className="pt-8">
                <p className="font-code-sm text-code-sm text-on-surface-variant opacity-60">
                  © 2024 BuildInByte Engineering. All rights reserved.
                </p>
              </div>
            </div>
            {/* Links Column 1 */}
            <div className="col-span-1">
              <h4 className="font-label-caps text-label-caps text-on-surface uppercase mb-6 tracking-widest">Navigation</h4>
              <ul className="space-y-4">
                <li><a className="font-body-md text-body-md text-on-surface-variant hover:text-primary-fixed transition-colors" href="#solutions">Solutions</a></li>
                <li><a className="font-body-md text-body-md text-on-surface-variant hover:text-primary-fixed transition-colors" href="#showcase">Showcase</a></li>
                <li><a className="font-body-md text-body-md text-on-surface-variant hover:text-primary-fixed transition-colors" href="#process">Process</a></li>
              </ul>
            </div>
            {/* Links Column 2 */}
            <div className="col-span-1">
              <h4 className="font-label-caps text-label-caps text-on-surface uppercase mb-6 tracking-widest">Legal</h4>
              <ul className="space-y-4">
                <li><a className="font-body-md text-body-md text-on-surface-variant hover:text-primary-fixed transition-colors" href="#">Privacy Policy</a></li>
                <li><a className="font-body-md text-body-md text-on-surface-variant hover:text-primary-fixed transition-colors" href="#">Terms of Service</a></li>
                <li><a className="font-body-md text-body-md text-on-surface-variant hover:text-primary-fixed transition-colors" href="#contact">Contact</a></li>
              </ul>
            </div>
            {/* Status Column */}
            <div className="col-span-1">
              <h4 className="font-label-caps text-label-caps text-on-surface uppercase mb-6 tracking-widest">System Status</h4>
              <div className="glass-panel p-4 rounded border-white/5 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                <span className="font-code-sm text-code-sm text-on-surface-variant">All Systems Nominal</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </>
  );
}