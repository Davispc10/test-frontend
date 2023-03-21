import { axios } from '@/lib/axios';

export const getAllHeroes = async (page: number, nameStartsWith?: string) => {
  const limit = 10;
  const offset = (page - 1) * limit;

  const query = {
    limit,
    offset,
    ...(nameStartsWith && { nameStartsWith }),
  };

  const { data } = await axios.get('/characters', {
    params: query,
  });

  return data;
};
