/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        rose: { DEFAULT: '#E8A0BF', light: '#F5D5E0', dark: '#C77DA3' },
        gold: { DEFAULT: '#D4A574', light: '#F0DCC8' },
        background: '#FFF9F5',
        surface: '#FFFFFF',
        'surface-dim': '#FBF3EE',
        'text-primary': '#2D2024',
        'text-secondary': '#8C7284',
        border: '#F0E4EB',
        star: '#F5B041',
      },
    },
  },
  plugins: [],
};
