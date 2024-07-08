import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'http://gateway.marvel.com/v1/public/',
  params: {
    ts: 1,
    apikey: process.env.NEXT_PUBLIC_MARVEL_API_KEY,
    hash: process.env.NEXT_PUBLIC_MARVEL_API_HASH,
  },
});
