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
        canvas: '#F6F3EE',
        surface: '#FFFFFF',
        ink: '#1C1917',
        muted: '#57534E',
        faint: '#A8A29E',
        line: '#E7E2DA',
        accent: '#9A5B3C',
        'accent-hover': '#7C4630',
        'on-accent': '#F6F3EE',
        danger: '#9F2D2D',
        footer: '#EFEBE4',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        atelier: '1200px',
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '2px',
        md: '4px',
        lg: '4px',
        xl: '4px',
      },
      transitionTimingFunction: {
        atelier: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        atelier: '180ms',
      },
    },
  },
  plugins: [],
};
