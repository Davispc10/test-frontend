/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'gateway.marvel.com',
        },
        {
          protocol: 'http',
          hostname: 'i.annihil.us',
        },
       
      ],
    },
  };
  
  export default nextConfig;
  