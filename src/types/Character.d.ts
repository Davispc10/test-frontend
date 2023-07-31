import type { Collection, GenericApiResponse } from "./GenericApiResponse";
export interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  resourceURI: string;
  comics: Collection;
  series: Collection;
  stories: Collection;
  events: Collection;
  urls: {
    type: string;
    url: string;
  }[];
}

export interface CharactersApiResult extends GenericApiResponse<Character> {}
