import { useQuery } from "@tanstack/react-query";
import { getPokemonDetailsUseCase } from "@/lib/di";

const QUERY_KEY = ["pokemon", "details"] as const;

export function usePokemonDetails(id: string | number | null) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => getPokemonDetailsUseCase.execute(id!),
    enabled: id != null && id !== "",
  });
}
