"use client";

import { CharactersResponse } from "@/types/characters-response";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import md5 from "md5";

const fetcher = (characterId: string): AxiosPromise<CharactersResponse> => {
  const publicKey = "4e40b49f1b98db89d8c51844520b45be";
  const privateKey = "90d65ffd631bbcc29c7014a6190fb693d12d2b17";
  const timestamp = new Date().getTime();
  const hash = md5(timestamp + privateKey + publicKey);

  const apiUrl = "https://gateway.marvel.com/v1/public";

  const query = `ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

  return axios.get(`${apiUrl}/characters/${characterId}/comics?${query}`);
};
export function useCharacterComics(characterId: string) {
  const { data, isLoading } = useQuery({
    queryFn: () => fetcher(characterId),
    queryKey: ["comics", characterId],
  });
  return { data: data?.data?.data?.results, isLoading };
}
