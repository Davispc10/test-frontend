/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['i.annihil.us', 'gateway.marvel.com'],
	},
	env: {
		API_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
		PUBLIC_KEY: process.env.NEXT_PUBLIC_PUBLIC_KEY,
		PRIVATE_KEY: process.env.NEXT_PRIVATE_PRIVATE_KEY,
	},
}

module.exports = nextConfig

