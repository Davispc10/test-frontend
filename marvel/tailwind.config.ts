import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'banner-personages': "url('/assets/imgs/banner-personages.jpg')",
      },
      colors: {
        primary: {
          '700': '#1B222B',
          '500': '#212733',
          '400': '#272E3C',
          '200': '#2E3646',
        },
        secondary: {
          '700': '#00517D',
          '500': '#0070AC',
          '400': '#48ACE2',
          '200': '#BAD0FF',
        },
        tertiary: {
          '700': '#6C6B6E',
          '500': '#98989D',
          '400': '#DBDBDB',
          '200': '#F0F0F0',
        },
        error: {
          '400': '#DA1414',
          '100': '#FEEFEF',
        },
        success: {
          '400': '#287D3C',
          '100': '#EDF9F0',
        },
        warning: {
          '400': '#B95000',
          '100': '#FFF4EC',
        },
        info: {
          '400': '#2E5AAC',
          '100': '#EEF2FA',
        },
      },
    },
  },
  plugins: [],
}
export default config
