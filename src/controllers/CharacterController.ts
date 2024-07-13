import { CharacterRepository } from "@/repositories/CharacterRepository";
import { useQuery } from "@tanstack/react-query";

const characterRepository = new CharacterRepository()

export function useFetchCharacters(offset: number) {
  return useQuery({
    queryKey: ['characters'],
    queryFn: () => characterRepository.getAll(offset),
    staleTime: Infinity
  })
}
