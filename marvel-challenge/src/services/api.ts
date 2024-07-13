import axios from 'axios';

const API_BASE_URL = 'https://gateway.marvel.com/v1/public';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_KEY;
const HASH = process.env.NEXT_PUBLIC_HASH;

const getAuthParams = () => {
  const ts = '1';
  return { ts, apikey: PUBLIC_KEY, hash: HASH };
};

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const authParams = getAuthParams();
  config.params = { ...config.params, ...authParams };
  return config;
});

export default api;