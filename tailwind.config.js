const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ["marvel-primary"]: "#e23636",
        ["marvel-black"]: "#202020",
        ["marvel-white"]: "#FEFEFE",
        ["marvel-typo"]: "#504a4a",
        ["marvel-secondary"]: "#f78f3f",
        ["marvel-accent"]: "#518cca",
      },

      fontFamily: {
        primary: ["var(--font-rubik)", ...fontFamily.sans],
        serif: ["var(--font-rubik)", ...fontFamily.serif],
        marvel: ["var(--font-marvel)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
