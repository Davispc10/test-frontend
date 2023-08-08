"use client";

import fetcher from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useCharacterComics(characterId: string) {
  const { data, isLoading } = useQuery({
    queryFn: () => fetcher(`${"characters/" + characterId + "/comics"}`, {}),
    queryKey: ["comics", characterId],
  });
  return { data: data?.data?.data?.results, isLoading };
}
