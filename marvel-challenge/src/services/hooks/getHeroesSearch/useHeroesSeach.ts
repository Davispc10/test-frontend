import { useQuery } from "react-query";
import md5 from "md5";
import { api } from "@/services/api";
import axios from "axios";
export const BASE_URL = "https://gateway.marvel.com:443/v1/public/characters";
const publicKey = "d724d0ec5f7dfbf8641faecb901e8229";
const privateKey = "b676c1bbcb63a6dd6d914cef6d8943a205a193e0";

const time = Number(new Date());

const hash = md5(time + privateKey + publicKey);

export async function getHeroesSearch(search: string) {
  try {
    const { data } = await api.get(
      `characters?ts=${time}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${search}}`
    );

    return data.data.results;
  } catch (error) {
    console.log(error);
  }
}
