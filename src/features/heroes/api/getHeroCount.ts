import { axios } from '@/lib/axios';
import { HeroesApiResponse } from '../types/heroesApiResponse';

export const getHeroCount = (): Promise<Number> => {
  return axios.get<HeroesApiResponse>('/characters', {}).then(({ data }) => {
    if (!data) {
      throw new Error('No response from API');
    }

    return data.data.count;
  });
};
