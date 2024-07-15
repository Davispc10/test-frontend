/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "i.annihil.us",
        port: "",
        pathname: "/u/prod/marvel/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/photo-*",
      },
    ]
  }
};

export default nextConfig;
