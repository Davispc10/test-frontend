import { Comic } from "@core/domain/entities/comic";
import { Chance } from "chance";

const chance = Chance();

export const mockComic = (): Comic => {
  return new Comic({
    id: chance.integer(),
    modified: chance.date(),
    title: chance.name(),
    thumbnail: {
      extension: "jpg",
      path: "https://logospng.org/download/marvel/logo-marvel-1536",
    },
    description: chance.sentence(),
  });
};
