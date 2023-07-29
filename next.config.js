/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "static.vecteezy.com",
      "upload.wikimedia.org",
      "i.annihil.us",
    ],
  },
};

module.exports = nextConfig;
