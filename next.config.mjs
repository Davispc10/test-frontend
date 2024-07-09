/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.annihil.us",
      },
      {
        protocol: "http",
        hostname: "i.annihil.us",
      },
    ],
  },
};

export default nextConfig;
