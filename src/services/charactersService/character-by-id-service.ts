import { httpClient } from '@/lib/httpClient';

export type CharacterByIdResponse = {
  data: {
    results: Array<{
      id: number;
      name: string;
      description: string;
      modified: string;
      thumbnail: {
        path: string;
        extension: string;
      };
      resourceURI: string;
      comics: {
        available: number;
        collectionURI: string;
        items: Array<{
          resourceURI: string;
          name: string;
        }>;
        returned: number;
      };
    }>;
  };
};

export async function getCharacterById(id: number) {
  const { data } = await httpClient.get<CharacterByIdResponse>(`/characters/${id}`);
  return data.data.results[0];
}
