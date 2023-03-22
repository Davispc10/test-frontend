import { QueryConfig, ExtractFnReturnType } from '@/lib/react-query';
import { useQuery } from '@tanstack/react-query';
import { getHeroDetailsById } from '../api/getHeroDetailsById';

type QueryFnType = typeof getHeroDetailsById;

type UseHeroesOptions = {
  config?: QueryConfig<QueryFnType>;
  id: number;
};

export const useHeroDetails = ({ id, config = {} }: UseHeroesOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['hero_details', id],
    queryFn: () => getHeroDetailsById({ id }),
  });
};
