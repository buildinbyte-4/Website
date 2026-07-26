// ===== SHARED DATA & TYPES =====

export const NAV_LINKS = [
  { label: 'Available Projects', href: '#projects' },
  { label: 'Custom Services', href: '#services' },
  { label: 'Our Work', href: '#work' },
];

export const METRICS = [
  { label: 'Projects Delivered', value: '24+', sub: 'and counting' },
  { label: 'Client Satisfaction', value: '99%', sub: 'across all projects' },
  { label: 'Active Custom Build Slots', value: '2', sub: 'slots available now' },
  { label: 'Avg. Turnaround Time', value: '5 Days', sub: 'delivery guarantee' },
];

export const FILTER_TABS = ['All', 'Web Apps', 'Mobile Apps', 'AI Tools', 'APIs'];

export const PROJECTS = [
  {
    id: 1,
    title: 'SaaS Analytics Dashboard',
    desc: 'Full-stack metrics platform with real-time charts, billing integrations, and multi-tenant auth.',
    category: 'Web Apps',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    price: '₹18,000',
    status: 'Available Instantly',
    img: 'analytics',
  },
  {
    id: 2,
    title: 'AI Content Generator',
    desc: 'GPT-powered content studio with prompt libraries, export pipelines, and usage billing.',
    category: 'AI Tools',
    stack: ['Next.js', 'OpenAI', 'Stripe'],
    price: '₹24,000',
    status: 'Available Instantly',
    img: 'ai',
  },
  {
    id: 3,
    title: 'Mobile EHR App',
    desc: 'HIPAA-compliant cross-platform health records application with appointment scheduling.',
    category: 'Mobile Apps',
    stack: ['React Native', 'Supabase', 'WebRTC'],
    price: '₹32,000',
    status: 'Custom Build Only',
    img: 'mobile',
  },
  {
    id: 4,
    title: 'Multi-Gateway Payment API',
    desc: 'Stripe + Razorpay + PayPal routing microservice with automatic failover and webhook handling.',
    category: 'APIs',
    stack: ['Go', 'Docker', 'PostgreSQL'],
    price: '₹10,000',
    status: 'Available Instantly',
    img: 'api',
  },
  {
    id: 5,
    title: 'B2B CRM Pipeline',
    desc: 'Lightweight Kanban CRM with deal stages, lead scoring, email sync, and reporting.',
    category: 'Web Apps',
    stack: ['Vue 3', 'Express', 'MongoDB'],
    price: '₹14,500',
    status: 'Available Instantly',
    img: 'crm',
  },
  {
    id: 6,
    title: 'Document AI Parser',
    desc: 'Local-first contract scanner that flags risky clauses, redacts PII, and exports audit logs.',
    category: 'AI Tools',
    stack: ['Python', 'LangChain', 'FastAPI'],
    price: '₹19,500',
    status: 'Available Instantly',
    img: 'doc',
  },
];

export const SERVICES = [
  {
    icon: '',
    title: 'Full-Stack Web Development',
    desc: 'End-to-end SaaS platforms, internal tools, and customer-facing apps delivered in weeks, not months.',
  },
  {
    icon: '',
    title: 'Custom APIs & Integrations',
    desc: 'High-performance REST and GraphQL APIs, webhook pipelines, and third-party integration work.',
  },
  {
    icon: '',
    title: 'Machine Learning & Automation',
    desc: 'LLM-powered features, document processing, data pipelines, and intelligent workflow automation.',
  },
];
