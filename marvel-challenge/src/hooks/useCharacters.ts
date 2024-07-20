import { useQuery } from '@tanstack/react-query';
import { getCharacters } from '../services/marvelAPI';

interface Character {
  id: number;
  name: string;
  thumbnail: string;
}

export const useCharacters = (page: number, searchTerm: string) => {
  return useQuery<Character[], Error>({
    queryKey: ['characters', page, searchTerm],
    queryFn: () => getCharacters(page, searchTerm),
    staleTime: 10 * 60 * 100, // 10 minutos
    gcTime: 30 * 60 * 100 // 30 minutos
  });
};