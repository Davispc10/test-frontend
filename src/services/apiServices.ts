import axios from "axios";
import { BASE_URL, generateMD5Hash, privateKey, publicKey } from "../utils/utils";

export const getHeroes = async (offset: number, itemsPerPage: number, search?: string) => {
  const stringToHash = `1${privateKey}${publicKey}`;
  const md5Hash = generateMD5Hash(stringToHash);

  let url = `${BASE_URL}/characters?offset=${offset}&limit=${itemsPerPage}&ts=1&apikey=${publicKey}&hash=${md5Hash}`;
  
  if(search) {
    url += `&nameStartsWith=${search}`;
  }

  const response = await axios.get(url);
  //setTotalPages(response.data.data.total);
  //return response.data.data.results;
  return response.data.data;
};