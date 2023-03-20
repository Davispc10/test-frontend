/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'marvel-red': '#e23636',
        'marvel-blue': '#518cca',
      },
      backgroundImage: {
        comic: "url('/images/comic-texture.png')",
      },
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      marvel: ['Marvel', 'sans-serif'],
    },
  },
  plugins: [],
};
