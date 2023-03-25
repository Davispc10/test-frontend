import { Comic, ComicThumbnail } from "@/features/comics";
import { Chance } from "chance";

const chance = new Chance();

export class ComicMock implements Comic {
  id: number = chance.integer({ min: 1, max: 100 });
  title: string = chance.name();
  description: string = chance.sentence();
  thumbnail: ComicThumbnail = {
    path: chance.url(),
    extension: chance.pickone(["jpg", "png", "gif"]),
  };
}
