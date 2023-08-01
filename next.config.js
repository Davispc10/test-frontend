/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.annihil.us', 'res.cloudinary.com', 'static.vecteezy.com'],
    minimumCacheTTL: 60 * 5,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/page/0',
        permanent: false,
      },
      {
        source: '/page',
        destination: '/page/0',
        permanent: false,
      },
      {
        source: '/search',
        destination: '/page/0',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
