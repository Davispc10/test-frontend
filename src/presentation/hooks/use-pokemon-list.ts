import { useQuery } from "@tanstack/react-query";
import { getPokemonListUseCase } from "@/lib/di";

const QUERY_KEY = ["pokemon", "list"] as const;

export interface UsePokemonListParams {
  page: number;
  limit?: number;
  search?: string;
  types?: string[];
  minAttack?: number;
  maxAttack?: number;
  minExperience?: number;
  maxExperience?: number;
  generation?: string;
  color?: string;
  habitat?: string;
}

export function usePokemonList({
  page,
  limit = 20,
  search,
  types,
  minAttack,
  maxAttack,
  minExperience,
  maxExperience,
  generation,
  color,
  habitat,
}: UsePokemonListParams) {
  return useQuery({
    queryKey: [
      ...QUERY_KEY,
      page,
      limit,
      search ?? "",
      (types ?? []).join(","),
      minAttack ?? "",
      maxAttack ?? "",
      minExperience ?? "",
      maxExperience ?? "",
      generation ?? "",
      color ?? "",
      habitat ?? "",
    ],
    queryFn: () =>
      getPokemonListUseCase.execute({
        page,
        limit,
        search: search?.trim() || undefined,
        types: types && types.length > 0 ? types : undefined,
        minAttack,
        maxAttack,
        minExperience,
        maxExperience,
        generation,
        color,
        habitat,
      }),
  });
}
