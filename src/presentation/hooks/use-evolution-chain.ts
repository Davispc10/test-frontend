"use client";

import { useQuery } from "@tanstack/react-query";
import { pokemonRepository } from "@/lib/di";

export function useEvolutionChain(url: string | null) {
  return useQuery({
    queryKey: ["evolution-chain", url],
    queryFn: () => pokemonRepository.getEvolutionChain(url!),
    enabled: !!url?.trim(),
  });
}
