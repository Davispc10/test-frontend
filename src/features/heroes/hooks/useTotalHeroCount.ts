import { QueryConfig, ExtractFnReturnType } from '@/lib/react-query';
import { useQuery } from '@tanstack/react-query';
import { getTotalHeroCount } from '../api/getHeroCount';

type QueryFnType = typeof getTotalHeroCount;

type UseTotalHeroCountOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useTotalHeroCount = (
  { config }: UseTotalHeroCountOptions = { config: {} }
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['hero_count'],
    queryFn: () => getTotalHeroCount(),
  });
};
