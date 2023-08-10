"use client";

import { useQuery } from "@tanstack/react-query";
import fetcher from "services/api";

export function useCharacterDetail(characterId: string) {
  const { data, isLoading } = useQuery({
    queryFn: () => fetcher(`${"characters/" + characterId}`, {}),
    queryKey: ["character", characterId],
  });
  return { data: data?.data?.data?.results, isLoading };
}
