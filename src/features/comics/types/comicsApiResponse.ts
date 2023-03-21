import { Comic } from './comic';

export type ComicsApiResponse = {
  data: {
    results: Comic[];
    offset: number;
    limit: number;
    total: number;
    count: number;
  };
};
