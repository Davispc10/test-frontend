import { Character } from "@core/domain/entities/character";
import { Chance } from "chance";

const chance = Chance();

export const mockCharacter = (): Character => {
  return new Character({
    id: chance.integer({ min: 100000, max: 333333 }),
    modified: chance.date(),
    name: chance.name(),
    thumbnail: {
      extension: "jpg",
      path: "https://logospng.org/download/marvel/logo-marvel-1536",
    },
    description: chance.sentence(),
  });
};
