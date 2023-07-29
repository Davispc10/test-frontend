import { useQuery } from "react-query";
import md5 from "md5";
import { api } from "@/services/api";

const publicKey = "d724d0ec5f7dfbf8641faecb901e8229";
const privateKey = "b676c1bbcb63a6dd6d914cef6d8943a205a193e0";

const time = Number(new Date());

const hash = md5(time + privateKey + publicKey);

type Heroes = {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    extension: string;
    path: string;
  };
};

type GetHeroes = {
  totalCount: number;
  heroes: Heroes[];
};

export async function getHeroes(): Promise<GetHeroes> {
  const { data } = await api.get(
    `characters?ts=${time}&apikey=${publicKey}&hash=${hash}`
    // {
    //   params: {
    //     page,
    //   },
    // }
  );

  const totalCount = "";

  const heroes = data.data.results.map((result) => {
    return {
      id: result.id,
      name: result.name,
      description: result.description,
      thumbnail: `${result.thumbnail.path}.${result.thumbnail.extension}`,
    };
  });

  return heroes;
}

export function useHeroes() {
  return useQuery("heroes", getHeroes, {
    staleTime: 1000 * 5, // 5seconds
  });
}
