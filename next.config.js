/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["i.annihil.us"],
    minimumCacheTTL: 60 * 10, // 10 minutes
  },
};

module.exports = nextConfig;
