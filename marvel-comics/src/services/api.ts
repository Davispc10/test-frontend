import axios from "axios";

export const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  params: {
    apikey: process.env.VUE_APP_PUBLIC_KEY,
  },
});

api.interceptors.response.use(
  ({ data }) => data.data,
  (error) => error
);
