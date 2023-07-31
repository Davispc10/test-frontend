export interface HeroesProsps {
  id: number;
  name: string;
  modified: string;
  description: string;
  resourceURI: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: number;
    collectionURI: string;
    returned: number;
  };
}

export interface ComicsProps {
  id: number;
  digitalId: number;
  title: string;
  description: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  images: {
    path: string;
    extension: string;
  }[];
}
