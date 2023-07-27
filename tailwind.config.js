/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        marvel: {
          primary: '#e23636',
          white: '#fff',
        },
        dark: '#202020',
      },
      fontFamily: {
        marvel: ['marvel', 'sans-serif'],
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '50%': { transform: 'scale(1.2)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        moveEffect: {
          '0%': { 'background-position': '0% 50%' },
          '100%': { 'background-position': '200% 50%' },
        },
        move: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(10px)' },
        },
        gradient: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
      },
      animation: {
        scaleIn: 'scaleIn 0.3s ease-in-out',
        moveEffect: 'moveEffect 480s linear infinite',
        move: 'move 3s ease infinite alternate',
        gradient: 'gradient 10s ease infinite',
      },
    },
  },
  plugins: [],
};
