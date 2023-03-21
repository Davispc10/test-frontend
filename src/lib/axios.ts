import Axios, { AxiosRequestConfig } from 'axios';
import { BASE_API_URL, API_KEY } from '@/config';

export const axios = Axios.create({
  baseURL: BASE_API_URL,
});

export const axiosRequestConfig: AxiosRequestConfig = {
  params: {
    apikey: API_KEY,
  },
};

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
  }
);
