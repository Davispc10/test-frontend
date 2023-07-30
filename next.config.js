/** @type {import('next').NextConfig} */

module.exports = ({
  env: {
    MARVEL_PUBLIC_KEY: process.env.MARVEL_PUBLIC_KEY,
    MARVEL_PRIVATE_KEY: process.env.MARVEL_PRIVATE_KEY,
    APP_URL: process.env.APP_URL,
  },
  images: {
    deviceSizes: [320, 640, 768, 1024, 1600],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.annihil.us",
        port: "",
        pathname: "/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,

  compiler: {
    styledComponents: true,
  },
});
