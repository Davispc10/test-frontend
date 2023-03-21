import { QueryConfig, ExtractFnReturnType } from '@/lib/react-query';
import { useQuery } from '@tanstack/react-query';
import { listHeroes } from '../api/listHeroes';

type QueryFnType = typeof listHeroes;

type UseHeroesOptions = {
  config?: QueryConfig<QueryFnType>;
  page: number;
  nameStartsWith?: string;
};

export const useHeroes = ({
  page,
  nameStartsWith,
  config = {},
}: UseHeroesOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['heroes', page, nameStartsWith],
    queryFn: () => listHeroes({ page, nameStartsWith }),
  });
};
