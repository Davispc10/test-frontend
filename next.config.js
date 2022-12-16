/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["i.annihil.us"],
    minimumCacheTTL: 60 * 10, // 10 minutes
  },

  async redirects() {
    const redirectToCharactersList = ["/"];
    return [
      ...redirectToCharactersList.map((path) => ({
        source: path,
        destination: "/characters",
        permanent: false,
      })),
    ];
  },
};

module.exports = nextConfig;
