import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MARVEL_API_URL,
});
