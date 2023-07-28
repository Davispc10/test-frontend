import axios from "axios";
export const APIMarvel = axios.create({
  baseURL: "https://gateway.marvel.com:443/v1/public",
});
