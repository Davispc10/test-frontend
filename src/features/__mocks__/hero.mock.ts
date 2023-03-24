import { Chance } from "chance";
import { Hero } from "../heroes";

const chance = new Chance();

export const heroMock: Hero = {
  id: chance.integer(),
  name: chance.name(),
  description: chance.sentence(),
  thumbnail: {
    path: chance.url(),
    extension: chance.pickone(["jpg", "png", "gif"]),
  },
};
