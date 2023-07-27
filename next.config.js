/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['localhost', 'i.annihil.us']
    },
    env: {
      timeStamp: '020202',
      apiKeyPublic: 'd33a7a16bc8e00ff744fe7ea80abf45d',
      apiKeyPrivate: '786b1de57c3c52f5f1e30a2b71df65e08b4251df',
      hash: 'a3f564d50e02ec59ebaa6c13ab4a6b59',
    },
  }
  
  module.exports = nextConfig
  