/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#ff9138',
          600: '#b84c00',
          700: '#9a3e00',
          800: '#7c3200',
          900: '#652c0d',
          950: '#30190c',
        },
        canvas: 'var(--canvas)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        'accent-soft': 'var(--accent-soft)',
        violet: 'var(--violet)',
        success: 'var(--success)',
        'bg-primary-dark': 'var(--canvas)',
        'bg-surface-dark': 'var(--surface)',
        'text-primary': 'var(--foreground)',
        'text-secondary': 'var(--muted-foreground)',
        'text-muted': 'var(--muted-foreground)',
        'border-subtle': 'var(--border)',
        'accent-blue': 'var(--primary)',
        'accent-cyan': 'var(--primary)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      boxShadow: {
        card: '0 18px 45px -30px rgb(17 18 20 / 0.34)',
        'card-hover': '0 24px 60px -32px rgb(255 145 56 / 0.24)',
        'card-sm': '0 8px 24px -18px rgb(15 23 42 / 0.3)',
      }
    },
  },
  plugins: [],
};
