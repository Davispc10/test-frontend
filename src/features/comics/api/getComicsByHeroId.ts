import { axios } from '@/lib/axios';

export const getComicsByHeroId = async (id: number) => {
  const { data } = await axios.get(`/characters/${id}/comics`);
  return data;
};
