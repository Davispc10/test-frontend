import { Chance } from "chance";
import { Hero, HeroThumbnail } from "../features/heroes";

const chance = new Chance();

export class HeroMock implements Hero {
  id: number = chance.integer({ min: 1, max: 100 });
  name: string = chance.name();
  description: string = chance.sentence();
  thumbnail: HeroThumbnail = {
    path: chance.url(),
    extension: chance.pickone(["jpg", "png", "gif"]),
  };
}
