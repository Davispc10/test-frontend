import { CharacterRepository } from "@/repositories/CharacterRepository";
import { useQuery } from "@tanstack/react-query";

const characterRepository = new CharacterRepository()

export function useFetchCharacters() {
  return useQuery({
    queryKey: ['characters'],
    queryFn: () => characterRepository.getAll(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30 // 30 seconds
  })
}
