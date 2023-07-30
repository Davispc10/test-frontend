interface MarvelComic {
  id: number;
  title: string;
  description: string;
  pageCount: number;
  thumbnail: {
    path: string;
    extension: string;
  };
  creators: {
    available: number;
    items: {
      resourceURI: string;
      name: string;
    }[];
  };
  characters: {
    available: number;
    items: {
      resourceURI: string;
      name: string;
    }[];
  };
  series: {
    resourceURI: string;
    name: string;
  };
  urls: {
    type: string;
    url: string;
  }[];
}
