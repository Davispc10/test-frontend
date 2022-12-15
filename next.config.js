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
    const redirectToCharactersList = ["/", "/characters"];
    return [
      ...redirectToCharactersList.map((path) => ({
        source: path,
        destination: "/characters/1",
        permanent: false,
      })),
    ];
  },
};

module.exports = nextConfig;
