import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getAllHeroes } from '../api/getAllHeroes';
import { HeroesApiResponse } from '../types/heroesApiResponse';

export const useHeroes = (page: number, nameStartsWith?: string) => {
  return useQuery<HeroesApiResponse, AxiosError>(
    ['heroes', page, nameStartsWith],
    () => getAllHeroes(page, nameStartsWith),
    {
      keepPreviousData: true,
    }
  );
};
