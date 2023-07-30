/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        smbounce: {
          '0%, 100%': {
            transform: 'translateY(0%)',
            ["animation-timing-function"]: "cubic-bezier(0, 0, 0.2, 1)"
          },
          '50%': {
            transform: 'translateY(-5%)',
            ["animation-timing-function"]: "cubic-bezier(0.8, 0, 1, 1)"
          },
        }
      },
      animation: {
        smbounce: 'smbounce 0.5 ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
