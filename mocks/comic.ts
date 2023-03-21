import { Comic } from "@/src/@core/domain/entities/Comic";

// Mockando comic para testes
export const mockComic = (): Comic => {
    return new Comic({
      id: 0, 
      comic: { items: [{name: '', resourceURI: ''}]},
      thumbnail: {
        extension: "jpg",
        path: "https://cdn.pixabay.com/photo/2019/03/21/02/51/deadpool-4070071_960_720",
      },
      modified: new Date(999999),
      title: 'title'
    });
  };