import { useQuery } from '@tanstack/react-query';
import { getCharacterComics } from '../services/marvelAPI';

interface Comic {
  id: number;
  title: string;
  thumbnail: string;
}

export const useCharacterComics = (id: number) => {
  return useQuery<Comic[], Error>({
    queryKey: ['characterComics', id],
    queryFn: () => getCharacterComics(id),
    enabled: !!id,
    staleTime: 10 * 60 * 100, // 10 minutos
    gcTime: 30 * 60 * 100 // 30 minuut
  });
};