import { Image } from "./Characters";

export interface IComicDataWrapper {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: IComicCharacterDataContainer;
  etag: string;
}

export interface IComicCharacterDataContainer {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: IComic[];
}

export interface IComic {
  id: number;
  title: string;
  description?: string;
  thumbnail?: Image;
}
