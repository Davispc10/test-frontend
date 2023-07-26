import axios from 'axios';

const api = axios.create({
	baseURL: `https://gateway.marvel.com/`,
});

export default api;
