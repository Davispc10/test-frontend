import { Chance } from "chance";
import { Comic } from "../comics";

const chance = new Chance();

export const comicMock: Comic = {
  id: chance.integer(),
  title: chance.name(),
  description: chance.sentence(),
  thumbnail: {
    path: chance.url(),
    extension: chance.pickone(["jpg", "png", "gif"]),
  },
};

export const comicUndefinedDescriptionMock: Comic = {
  id: chance.integer(),
  title: chance.name(),
  description: "",
  thumbnail: {
    path: chance.url(),
    extension: chance.pickone(["jpg", "png", "gif"]),
  },
};

export const comicUndefinedThumbnailMock: Comic = {
  id: chance.integer(),
  title: chance.name(),
  description: chance.sentence(),
  thumbnail: {
    path: chance.word() + "_image_not_available",
    extension: chance.pickone(["jpg", "png", "gif"]),
  },
};
