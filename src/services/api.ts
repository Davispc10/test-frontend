import axios from "axios";
import md5 from "md5";

const TS = new Date().getTime();
const PRIVATE_KEY = process.env.NEXT_PUBLIC_API_PRIVATE_TOKEN;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_API_PUBLIC_TOKEN;
const hash = md5(`${TS.toString()}${PRIVATE_KEY}${PUBLIC_KEY}`);

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
  params: {
    ts: TS,
    hash,
    apikey: PUBLIC_KEY,
  },
});
