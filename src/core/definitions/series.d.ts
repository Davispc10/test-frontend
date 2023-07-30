interface MarvelSeries {
  id: number;
  title: string;
  startYear: number;
  endYear: number;
  rating: string;
  description: string | null;
  modified: Date;
  thumbnail: MarvelThumbnail;
  comics: MarvelResourceList;
  stories: MarvelResourceList;
  events: MarvelResourceList;
  characters: MarvelResourceList;
  creators: MarvelResourceList;
  next: null;
  previous: null;
  type: string;
  urls: MarvelUrl[];
}

interface MarvelThumbnail {
  path: string;
  extension: string;
}

interface MarvelResourceList {
  available: number;
  collectionURI: string;
  items: MarvelSummary[];
  returned: number;
}

interface MarvelSummary {
  resourceURI: string;
  name: string;
  type?: string;
}

interface MarvelUrl {
  type: string;
  url: string;
}