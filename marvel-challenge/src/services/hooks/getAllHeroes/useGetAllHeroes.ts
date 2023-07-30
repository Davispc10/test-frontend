import md5 from "md5";
import { api } from "@/services/api";

const publicKey = "d724d0ec5f7dfbf8641faecb901e8229";
const privateKey = "b676c1bbcb63a6dd6d914cef6d8943a205a193e0";

const time = Number(new Date());

const hash = md5(time + privateKey + publicKey);

export const getAllHeroes = async (
  offset: number,
  perPage: number,
  search?: string
) => {
  try {
    const { data } = await api.get(
      `characters?ts=${time}&apikey=${publicKey}&hash=${hash}&offset=${offset}&limit=${perPage}${
        search ? `&nameStartsWith=${search}` : ""
      }}`
    );

    return data.data;
  } catch (error) {
    console.log(error);
  }
};
