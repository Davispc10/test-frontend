import axios from "axios";

const marvelApi = axios.create({
  baseURL: "https://gateway.marvel.com:443/v1/public/",
});

export { marvelApi };
