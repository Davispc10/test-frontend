/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'i.annihil.us',
          },
        ],
      },
}

module.exports = nextConfig
