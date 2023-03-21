import { Hero } from './hero';

export type HeroesApiResponse = {
  data: {
    results: Hero[];
    offset: number;
    limit: number;
    total: number;
    count: number;
  };
};
