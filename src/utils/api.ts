import axios from 'axios';

const baseURL = 'https://gateway.marvel.com:443/v1/public/';

const api = axios.create({
  baseURL,
});

export default api;