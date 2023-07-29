import { useQuery } from "react-query";
import md5 from "md5";
import { api } from "@/services/api";
import axios from "axios";
export const BASE_URL = "https://gateway.marvel.com:443/v1/public/characters";
const publicKey = "d724d0ec5f7dfbf8641faecb901e8229";
const privateKey = "b676c1bbcb63a6dd6d914cef6d8943a205a193e0";

const time = Number(new Date());

const hash = md5(time + privateKey + publicKey);

export const getHeroesSearch = async (search: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?ts=${time}&nameStartsWith=${search}&apikey=${publicKey}&hash=${hash}`
    );

    const data = response.data.data.results;

    return data;
  } catch (error) {
    console.log(error);
  }
};
