import { Character } from "@core/domain/entities/character";
import { Chance } from "chance";

const chance = Chance();

export const mockCharactersList = (): Character[] => {
  return Array(20)
    .fill(0)
    .map(() => {
      const characterId = chance.integer({ max: 3333333, min: 1000000 });
      const comicsAvailable = chance.integer({ min: 4, max: 10 });
      return new Character({
        id: chance.integer(),
        modified: chance.date(),
        name: chance.name(),
        resourceURI: `http://gateway.marvel.com/v1/public/characters/${characterId}`,
        urls: [],
        comics: {
          available: comicsAvailable,
          collectionURI: `http://gateway.marvel.com/v1/public/characters/${characterId}/comics`,
          items: Array(comicsAvailable)
            .fill(0)
            .map(() => {
              const comicId = chance.integer({ max: 3333333, min: 1000000 });

              return {
                name: chance.name(),
                resourceURI: `http://gateway.marvel.com/v1/public/comics/${comicId}`,
              };
            }),
          returned: comicsAvailable,
        },
        thumbnail: {
          extension: "jpg",
          path: "https://logospng.org/download/marvel/logo-marvel-1536",
        },
        description: chance.sentence(),
      });
    });
};
