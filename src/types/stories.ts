export interface GetStoriesResponse {
  data: Root;
}

export interface Root {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Story[];
}

export interface Story {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  type: string;
  modified: string;
  thumbnail: any;
  creators: Creators;
  characters: Characters;
  series: Series;
  comics: Comics;
  events: Events;
  originalIssue: OriginalIssue;
}

export interface Creators {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}

export interface Item {
  resourceURI: string;
  name: string;
  role?: string;
  type?: string;
}

export interface Characters {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}

export interface Series {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}

export interface Comics {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}

export interface Events {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}

export interface OriginalIssue {
  resourceURI: string;
  name: string;
}
