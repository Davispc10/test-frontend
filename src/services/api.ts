import axios from "axios";

import md5 from "md5";

const MARVEL_PUBLIC_KEY = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY ?? "";
const MARVEL_PRIVATE_KEY = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY ?? "";

const apikey = MARVEL_PUBLIC_KEY;
const ts = new Date().getTime().toString();
const hash = md5(ts + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY);

const api = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public",
  params: {
    apikey,
    hash,
    ts,
  },
});

export { api };
