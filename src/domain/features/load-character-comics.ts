import { Comic } from "@/domain/models";

export type LoadCharactersComicsResult = {
  comics: Comic[];
  totalComics: number;
}

export interface LoadCharactersComics {
  loadAll: (id: number, page?: number, limit?: number) => Promise<LoadCharactersComicsResult>;
}
