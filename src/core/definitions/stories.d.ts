interface MarvelStories {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  urls: MarvelUrl[];
  startYear: number;
  endYear: number;
  rating: string;
  modified: Date;
  thumbnail: MarvelThumbnail;
  comics: MarvelResourceList;
  stories: MarvelResourceList;
  events: MarvelResourceList;
  characters: MarvelResourceList;
  creators: MarvelResourceList;
  next: MarvelSummary;
  previous: MarvelSummary;
}

interface MarvelUrl {
  type: string;
  url: string;
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
