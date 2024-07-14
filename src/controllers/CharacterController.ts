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

export function useFetchCharacter(characterId: string) {
  return useQuery({
    queryKey: ['character'],
    queryFn: () => characterRepository.getById(characterId),
    // staleTime: Infinity
  })
}

export function useFetchCharacterComics(characterId: string) {
  return useQuery({
    queryKey: ["character", "comics"],
    queryFn: () => characterRepository.getCharacterComics(characterId)
  })
}
