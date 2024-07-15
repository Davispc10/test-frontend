import { characterService } from "@/services/characterService";
import { useQuery } from "@tanstack/react-query";

export function useFetchCharacters(offset: number) {
  return useQuery({
    queryKey: ['characters'],
    queryFn: async () => await characterService.getAllCharacters(offset),
  })
}

export function useFetchCharacter(characterId: string) {
  return useQuery({
    queryKey: ['character'],
    queryFn: async () => await characterService.getCharacter(characterId)
  })
}

export function useFetchCharacterComics(characterId: string) {
  return useQuery({
    queryKey: ["character", "comics"],
    queryFn: async () => await characterService.getCharacterComics(characterId)
  })
}
