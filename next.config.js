/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.annihil.us'],
    minimumCacheTTL: 60 * 5,
  },
};

module.exports = nextConfig;
