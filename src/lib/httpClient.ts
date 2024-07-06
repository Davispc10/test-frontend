import axios from "axios";

export const httpClient= axios.create({
  baseURL: process.env.NEXT_MARVEL_API_URL,
  params: {
    apiKey: process.env.NEXT_PUBLIC_MARVEL_API_KEY
  }
})