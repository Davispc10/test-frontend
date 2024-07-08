/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'i.annihil.us',
      },
      {
        protocol: 'https',
        hostname: 'gateway.marvel.com',
      },
    ],
  },
};

export default nextConfig;
