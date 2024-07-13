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
  });
};