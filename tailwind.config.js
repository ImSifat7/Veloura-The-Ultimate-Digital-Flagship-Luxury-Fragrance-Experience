/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          gold: '#D4AF37',
          'gold-light': '#E8D48B',
          'gold-dark': '#B8941F',
          black: '#0A0A0A',
          cream: '#FDFAF3',
          'cream-dark': '#F0EBD8',
          dark: '#1A1A1A',
        }
      },
      fontFamily: {
        premium: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
