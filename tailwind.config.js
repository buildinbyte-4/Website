/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brutal-bg': 'var(--brutal-bg)',
        'brutal-black': 'var(--brutal-black)',
        'brutal-yellow': 'var(--brutal-yellow)',
        'brutal-blue': 'var(--brutal-blue)',
        'brutal-pink': 'var(--brutal-pink)',
        'brutal-green': 'var(--brutal-green)',
        
        // Aliases to avoid breaking everything entirely right away, though we will refactor components
        'bg-primary-dark': 'var(--brutal-bg)',
        'bg-surface-dark': 'var(--brutal-bg)',
        'text-primary': 'var(--brutal-black)',
        'text-secondary': 'var(--brutal-black)',
        'text-muted': 'var(--brutal-black)',
        'border-subtle': 'var(--brutal-black)',
        'accent-blue': 'var(--brutal-blue)',
        'accent-cyan': 'var(--brutal-pink)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      boxShadow: {
        'brutal': '6px 6px 0px 0px rgba(0,0,0,1)',
        'brutal-hover': '8px 8px 0px 0px rgba(0,0,0,1)',
        'brutal-sm': '4px 4px 0px 0px rgba(0,0,0,1)',
      }
    },
  },
  plugins: [],
};
