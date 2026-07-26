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
        // Beige / Cream Backgrounds
        cream: {
          50:  '#FDFBF7',
          100: '#F5EFEB',
          200: '#F4EBE1',
          300: '#EDE0D4',
        },
        // Brown / Espresso Text
        espresso: {
          700: '#3D2314',
          800: '#2C1D11',
          900: '#1A0E09',
        },
        // Maroon Accents / CTAs
        maroon: {
          50:  '#FDF2F4',
          100: '#FBE4E8',
          200: '#F5BEC7',
          300: '#EE8FA2',
          400: '#E25B7A',
          500: '#C2183A',
          600: '#A0102E',
          700: '#800020',
          800: '#600018',
          900: '#4A0E17',
          950: '#300A10',
        },
        // Border utility
        border: {
          muted: 'rgba(128,0,32,0.15)',
        },
      },
      fontFamily: {
        sans: ['"Titillium Web"', 'system-ui', 'sans-serif'],
        serif: ['"Playwrite NZ"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
