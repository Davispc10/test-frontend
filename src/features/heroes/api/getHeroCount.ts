import { axios } from '@/lib/axios';
import { HeroesApiResponse } from '../types/heroesApiResponse';

export const getTotalHeroCount = (): Promise<number> => {
  return axios.get<HeroesApiResponse>('/characters').then(({ data }) => {
    return data.data.total;
  });
};
