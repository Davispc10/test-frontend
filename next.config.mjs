import './src/env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.annihil.us', 'gateway.marvel.com'],
  },
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
}

export default nextConfig
