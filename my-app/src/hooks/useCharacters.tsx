"use client";
import { CharactersResponse } from "@/types/characters-response";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import md5 from "md5";

const fetcher = (offset: number): AxiosPromise<CharactersResponse> => {
  const publicKey = "4e40b49f1b98db89d8c51844520b45be";
  const privateKey = "90d65ffd631bbcc29c7014a6190fb693d12d2b17";
  const timestamp = new Date().getTime();
  const hash = md5(timestamp + privateKey + publicKey);

  const apiUrl = "https://gateway.marvel.com/v1/public";

  const params = {
    apikey: publicKey,
    ts: timestamp,
    hash: hash,
    offset: offset
  };

  return axios.get(`${apiUrl}/characters`, { params });
};
export function useCharacters(offset: number) {
  const { data } = useQuery({
    queryFn: () => fetcher(offset),
    queryKey: ["characters", offset],
  });
  return { data: data?.data?.data?.results };
}
