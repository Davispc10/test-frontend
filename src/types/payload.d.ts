export interface Payload<T> {
  data: Data<T>;
}

export interface Data<T> {
  offset: number;
  results: T[];
  total: number;
}

export interface Character {
  comics: {
    available: number;
  };
  description: string;
  events: {
    available: number;
  };
  id: number;
  name: string;
  series: {
    available: number;
  };
  stories: {
    available: number;
  };
  thumbnail: Thumbnail;
  urls: URL[];
}

export interface Reference {
  description?: string;
  id: number;
  thumbnail: Thumbnail;
  title: string;
}

interface Thumbnail {
  path: string;
  extension: string;
}

interface URL {
  type: URLType;
  url: string;
}

enum URLType {
  Comiclink = "comiclink",
  Detail = "detail",
  Wiki = "wiki",
}
