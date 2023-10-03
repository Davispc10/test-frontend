import axios, { AxiosPromise } from 'axios';
import md5 from 'md5';

const api = "https://gateway.marvel.com/v1/public";

const fetcher = (
  endpoint: string,
  params: Record<string, any>
): AxiosPromise<any> => {
  const publicKey = '4e40b49f1b98db89d8c51844520b45be';
  const privateKey = '90d65ffd631bbcc29c7014a6190fb693d12d2b17';
  const timestamp = new Date().getTime().toString();
  const hash = md5(timestamp + privateKey + publicKey);

  const defaultParams = {
    ...params,
    ts: timestamp,
    apikey: publicKey,
    hash: hash,
  };

  const query = new URLSearchParams(defaultParams).toString();

  return axios.get(`${api}/${endpoint}?${query}`);
};

export default fetcher;
