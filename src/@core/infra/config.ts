const config = {
  marvelPublicApiKey: process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY,
  marvelEndpoint: "https://gateway.marvel.com/v1/public",
  onlyServer: {
    marvelPrivateKey: process.env.MARVEL_PRIVATE_KEY,
  },
};

export default config;
