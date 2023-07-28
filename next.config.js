/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "t.ctcdn.com.br",
      },
      {
        protocol: "http",
        hostname: "i.annihil.us",
      },
    ],
  },
};

module.exports = nextConfig;
