import Axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { BASE_API_URL, API_KEY } from '@/config';
import { toast } from 'react-toastify';

export const axios = Axios.create({
  baseURL: BASE_API_URL,
});

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const apiKey = API_KEY;

  if (apiKey) {
    config.params.apikey = apiKey;
  }

  return config;
}

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;

    toast(message, {
      type: 'error',
    });
  }
);
