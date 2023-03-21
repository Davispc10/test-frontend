import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getComicsByHeroId } from '../api/getComicsByHeroId';
import { Comic } from '../types/comic';

export const useComics = (id: number) => {
  return useQuery<Comic, AxiosError>(
    ['comics', id],
    () => getComicsByHeroId(id),
    {
      keepPreviousData: true,
    }
  );
};
