"use client";

import fetcher from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useCharacterDetail(characterId: string) {
  const { data, isLoading } = useQuery({
    queryFn: () => fetcher(`${"characters/" + characterId}`, {}),
    queryKey: ["character", characterId],
  });
  return { data: data?.data?.data?.results, isLoading };
}
