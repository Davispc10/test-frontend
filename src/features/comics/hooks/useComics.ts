import { useQuery } from '@tanstack/react-query';
import { QueryConfig, ExtractFnReturnType } from '@/lib/react-query';
import { getComicsByHeroId } from '../api/getComicsByHeroId';

type QueryFnType = typeof getComicsByHeroId;

type UseComicsOptions = {
  config?: QueryConfig<QueryFnType>;
  id: number;
};

export const useComics = ({ config, id }: UseComicsOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['comics', id],
    queryFn: () => getComicsByHeroId(id),
  });
};
