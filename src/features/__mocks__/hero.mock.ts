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

export const heroUndefinedDescriptionMock: Hero = {
  id: chance.integer(),
  name: chance.name(),
  description: "",
  thumbnail: {
    path: chance.url(),
    extension: chance.pickone(["jpg", "png", "gif"]),
  },
};

export const heroUndefinedThumbnailMock: Hero = {
  id: chance.integer(),
  name: chance.name(),
  description: chance.sentence(),
  thumbnail: {
    path: chance.word() + "_image_not_available",
    extension: chance.pickone(["jpg", "png", "gif"]),
  },
};