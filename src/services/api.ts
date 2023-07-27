import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
  params: {
    apikey: process.env.NEXT_PUBLIC_API_PUBLIC_TOKEN,
  },
});
