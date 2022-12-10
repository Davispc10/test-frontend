const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--font-rubik)", ...fontFamily.sans],
        serif: ["var(--font-rubik)", ...fontFamily.serif],
      },
    },
  },
  plugins: [],
};
