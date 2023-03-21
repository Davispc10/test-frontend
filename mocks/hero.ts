import { Hero } from "@/src/@core/domain/entities/Hero";

// Mockando hero para testes
export const mockHero = (): Hero => {
  return new Hero({
    id: 0,
    name: 'Bruno Hero',
    comics: {available: 0, returned: 0, items: [{name: '', resourceURI: ''}]},
    resourceURI: '',
    thumbnail: {
      extension: "jpg",
      path: "https://cdn.pixabay.com/photo/2019/03/21/02/51/deadpool-4070071_960_720",
    },
    description: 'Description'
  });
};