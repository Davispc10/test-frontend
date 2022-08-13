/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    marvelLogo: 'https://i.pinimg.com/custom_covers/222x/614671117831336685_1572184866.jpg',
    baseUrl: 'https://gateway.marvel.com/v1/public/',
    timeStamp: '14587',
    apiKeyPublic: '2c048c1f62c48578c903474d6e79eb62',
    apiKeyPrivate: '84337085ae0558abac507cecb27f5a2cecd0181a',
    hash: '0b74f10207c96915f85a38556e8ce438',
  },
}

module.exports = nextConfig
