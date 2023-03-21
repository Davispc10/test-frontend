import { HERO_RETURN_LIMIT } from '@/config';
import { axios } from '@/lib/axios';
import { Hero } from '../types/hero';
import { HeroesApiResponse } from '../types/heroesApiResponse';

interface GetHeroesParams {
  page: number;
  nameStartsWith?: string;
}

export const listHeroes = ({
  page,
  nameStartsWith,
}: GetHeroesParams): Promise<Hero[]> => {
  const limit = HERO_RETURN_LIMIT;
  const offset = (page - 1) * limit;

  return axios
    .get<HeroesApiResponse>('/characters', {
      params: {
        limit,
        offset,
        nameStartsWith,
      },
    })
    .then(({ data }) => {
      if (!data) {
        throw new Error('No response from API');
      }

      return data.data.results;
    });
};
