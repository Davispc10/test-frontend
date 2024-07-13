import { useQuery } from '@tanstack/react-query';
import { getCharacterDetails } from '../services/marvelAPI';

interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
}

export const useCharacterDetails = (id: number) => {
  return useQuery<Character, Error>({
    queryKey: ['character', id],
    queryFn: () => getCharacterDetails(id),
    enabled: !!id,
  });
};