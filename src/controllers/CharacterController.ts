import { characterService } from "@/services/characterService";
import { useQuery } from "@tanstack/react-query";

export function useFetchCharacters(offset: number, keyword: string) {
  return useQuery({
    queryKey: ['characters', offset, keyword],
    queryFn: async () => await characterService.getAllCharacters(offset, keyword),
  })
}

export function useFetchCharacter(characterId: string) {
  return useQuery({
    queryKey: ['character', characterId],
    queryFn: async () => await characterService.getCharacter(characterId)
  })
}

export function useFetchCharacterComics(characterId: string) {
  return useQuery({
    queryKey: ["character", "comics", characterId],
    queryFn: async () => await characterService.getCharacterComics(characterId)
  })
}
