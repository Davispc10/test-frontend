import axios from "axios";

const ts = process.env.NEXT_PUBLIC_TS;
const apikey = process.env.NEXT_PUBLIC_APIKEY;
const hash = process.env.NEXT_PUBLIC_HASH;

const api = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public",
  params: {
    ts,
    apikey,
    hash,
  },
});

export default api;
