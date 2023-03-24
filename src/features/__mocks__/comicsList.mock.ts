import { Chance } from "chance";
import {
  comicMock,
  comicUndefinedDescriptionMock,
  comicUndefinedThumbnailMock,
} from "./comic.mock";

const chance = new Chance();

export const comicList = Array.from({ length: 10 }, () => {
  return chance.pickone([
    comicMock,
    comicUndefinedDescriptionMock,
    comicUndefinedThumbnailMock,
  ]);
});
