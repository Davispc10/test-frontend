import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'primary-100': '#F6F9E8',
				'primary-200': '#ADADAA',
				'primary-400': '#999999',
				'primary-500': '#555555',
				'primary-600': '#dc2626',
				'primary-700': '#2D2D2D',
				'primary-900': '#212121',
				'secondary-100': '#fafafa',
				'secondary-300': '#babcc4',
				'secondary-500': '#727275',
				'secondary-600': '#3c3c3c',
				'secondary-700': '#27272a',
			},
			backgroundImage: {
				'background-1': "url('/assets/backgrounds/bg1.png')",
				'background-2': "url('/assets/backgrounds/bg2.png')",
				'background-3': "url('/assets/backgrounds/bg3.png')",
				'background-4': "url('/assets/backgrounds/bg4.png')",
			},
			fontFamily: {
				dmsans: ['DM Sans', 'sans-serif'],
				montserrat: ['Montserrat', 'sans-serif'],
			},
			fontSize: {
				fontx: '1.5rem',
			},
			maxWidth: {
				'xs-text': '10rem',
				'sm-text': '20rem',
				'md-text': '30rem',
				'lg-text': '40rem',
			},
		},
		screens: {
			xs: '480px',
			sm: '768px',
			md: '1060px',
			lg: '1520px',
		},
	},
	plugins: [],
}
export default config

