/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        lato: ['Lato', 'sans-serif'], // Adicionamos a nova fonte
        noto: ['Noto Serif', 'serif']
      },
      colors: {
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },
        'custom-header': '#FFF0E6',
        'custom-header-2': '#fff0e6',
        'blue': '#fff0e6',
        'button': '#f1b7a9',
        'button-hover': '#b6c5d5',
        'footer': ''
      },
    },
  },
  plugins: [],
};