import { Chance } from "chance";
import {
  heroMock,
  heroUndefinedDescriptionMock,
  heroUndefinedThumbnailMock,
} from "./hero.mock";

const chance = new Chance();

export const heroList = Array.from({ length: 10 }, () => {
  chance.pickone([
    heroMock,
    heroUndefinedDescriptionMock,
    heroUndefinedThumbnailMock,
  ]);
});
