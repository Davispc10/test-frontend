import { Comic } from "@core/domain/entities/comic";
import { mockComic } from "./comic.mock";

export const mockComicsList = (): Comic[] => {
  return Array(20)
    .fill(0)
    .map(() => {
      return mockComic();
    });
};
