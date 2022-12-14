/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["i.annihil.us"],
  },
};

module.exports = nextConfig;
