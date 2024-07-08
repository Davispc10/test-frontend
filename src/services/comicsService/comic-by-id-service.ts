import { httpClient } from '@/lib/httpClient';

export async function getComicById(characterId: number) {
  const { data } = await httpClient.get(`/characters/${characterId}/comics`, {
    params: {
      format: 'comic',
      formatType: 'comic',
    },
  });
  return data.data;
}
