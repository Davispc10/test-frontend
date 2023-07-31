import { GetComicsResponse } from "./comics";
import { GetEventsResponse } from "./events";
import { GetSeriesResponse } from "./series";
import { GetStoriesResponse } from "./stories";

export interface HeroesListReducer {
  heroesListReducer: {
    heroesList: GetHeroesResponse;
    page: number;
    totalPages: number;
    itemsOffset: number;
    perPage: number;
  };
}

export interface SelectedHeroReducer {
  selectedHeroReducer: SelectedHeroReducerData;
}

export interface SelectedHeroReducerData {
  selectedHero: Hero;
  comics: GetComicsResponse;
  series: GetSeriesResponse;
  stories: GetStoriesResponse;
  events: GetEventsResponse;
}

export interface GetHeroesResponse {
  data: HeroesResponse;
}

export interface HeroesResponse {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Hero[];
}

export interface Hero {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: Comics;
  series: Series;
  stories: Stories;
  events: Events;
  urls: Url[];
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Comics {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}

export interface Item {
  resourceURI: string;
  name: string;
  type?: string;
}

export interface Series {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}

export interface Stories {
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

export interface Url {
  type: string;
  url: string;
}
