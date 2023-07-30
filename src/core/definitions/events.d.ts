interface MarvelEventData {
  characters: MarvelEventResource;
  comics: MarvelEventResource;
  creators: MarvelEventResource;
  description: string;
  end: string;
  id: number;
  modified: string;
  next: MarvelEventSummary;
  previous: MarvelEventSummary;
  resourceURI: string;
  series: MarvelEventResource;
  start: string;
  stories: MarvelEventResource;
  thumbnail: MarvelThumbnail;
  title: string;
  urls: MarvelUrl[];
}

interface MarvelEventResource {
  available: number;
  collectionURI: string;
  items: MarvelEventSummary[];
  returned: number;
}

interface MarvelEventSummary {
  resourceURI: string;
  name: string;
}

interface MarvelThumbnail {
  path: string;
  extension: string;
}

interface MarvelUrl {
  type: string;
  url: string;
}
