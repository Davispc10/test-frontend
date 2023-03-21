import { axios } from '@/lib/axios';
import { ComicsApiResponse } from '../types/comicsApiResponse';

export const getComicsByHeroId = async (id: number) => {
  const { data } = await axios.get<ComicsApiResponse>(
    `/characters/${id}/comics`
  );
  return data.data.results;
};
