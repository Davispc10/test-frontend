import axios from "axios";

export function getServerApi(ctx?: any) {
  const api = axios.create({
    
    baseURL: 'https://gateway.marvel.com:443/v1/public/',
  });

  

  return api;
}
