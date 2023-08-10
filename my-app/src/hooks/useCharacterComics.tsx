"use client";

import { useQuery } from "@tanstack/react-query";
import fetcher from "services/api";

export function useCharacterComics(characterId: string) {
  const { data, isLoading } = useQuery({
    queryFn: () => fetcher(`${"characters/" + characterId + "/comics"}`, {}),
    queryKey: ["comics", characterId],
  });
  return { data: data?.data?.data?.results, isLoading };
}
