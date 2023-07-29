import { useQuery } from "react-query";
import md5 from "md5";
import { api } from "@/services/api";
import axios from "axios";

const publicKey = "7bfe41ebd0f4f4631c41dfe891402576";
const privateKey = "0f4fcdaac01df9619fdf63bcc699d2a5f87896be";

const time = Number(new Date());

const hash = md5(time + privateKey + publicKey);

export async function getDetailHero(id: number) {
  const { data } = await axios.get(
    `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=${publicKey}&ts=${time}&hash=${hash}`
  );

  return data;
}
