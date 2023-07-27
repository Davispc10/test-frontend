import './src/env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.annihil.us'],
  },
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
}

export default nextConfig
