import axios from "axios";

const marvelApi = axios.create({
  baseURL: "https://gateway.marvel.com:443/v1/public/",
  params: {
    apikey: process.env.NEXT_PUBLIC_API_MARVEL_KEY,
  },
});

export { marvelApi };
