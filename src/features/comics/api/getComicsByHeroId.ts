import { axios } from '@/lib/axios';
import { Comic } from '../types/comic';
import { ComicsApiResponse } from '../types/comicsApiResponse';

export const getComicsByHeroId = ({ id }: { id: number }): Promise<Comic[]> => {
  return axios
    .get<ComicsApiResponse>(`/characters/${id}/comics`)
    .then((response) => {
      const comics = response.data.data.results;

      // Checar thumbnail
      const comicsWithThumbnail = comics.map((comic) => {
        if (comic.thumbnail.path.includes('image_not_available')) {
          return {
            ...comic,
            thumbnail: {
              path: '/images/marvel-logo',
              extension: 'png',
            },
          };
        }

        return comic;
      });

      return comicsWithThumbnail;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
};
