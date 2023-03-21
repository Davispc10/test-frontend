import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getAllHeroes } from '../api/getAllHeroes';
import { Hero } from '../types/hero';

export const useHeroes = (page: number, nameStartsWith?: string) => {
  return useQuery<Hero, AxiosError>(
    ['heroes', page, nameStartsWith],
    () => getAllHeroes(page, nameStartsWith),
    {
      keepPreviousData: true,
    }
  );
};
