import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public',
  params: {
    ts: 1,
    apikey: process.env.NEXT_PUBLIC_MARVEL_API_KEY,
    hash: process.env.NEXT_PUBLIC_MARVEL_API_HASH,
  },
});


export default api;
