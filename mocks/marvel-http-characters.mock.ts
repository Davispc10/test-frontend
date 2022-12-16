import { Chance } from "chance";

import { HttpResponse } from "@core/data/protocols/http-client";

const chance = Chance();

export const mockMarvelCharacterHttp = (): any => {
  const characterId = chance.integer({ max: 3333333, min: 1000000 });
  const chacaterName = chance.name();
  const comicsCount = chance.integer({ max: 10, min: 1 });
  const seriesCount = chance.integer({ max: 10, min: 1 });
  const storiesCount = chance.integer({ max: 10, min: 1 });
  const eventsCount = chance.integer({ max: 10, min: 1 });
  const urlsCount = chance.integer({ max: 10, min: 1 });

  return {
    id: characterId,
    name: chacaterName,
    description: "",
    modified: "2014-04-29T14:18:17-0400",
    thumbnail: {
      path: chance.avatar({
        domain: "i.annihil.us",
        path: "u/prod/marvel/i/mg/c/e0/",
        protocol: "http",
      }),
      extension: "jpg",
    },
    resourceURI: `http://gateway.marvel.com/v1/public/characters/${characterId}`,
    comics: {
      available: comicsCount,
      collectionURI: `http://gateway.marvel.com/v1/public/characters/${characterId}/comics`,
      items: Array(comicsCount)
        .fill(0)
        .map(() => ({
          resourceURI: `http://gateway.marvel.com/v1/public/comics/${chance.integer(
            { max: 40000, min: 10000 }
          )}`,
          name: chance.sentence({ words: 6 }),
        })),
      returned: comicsCount,
    },
    series: {
      available: seriesCount,
      collectionURI: `http://gateway.marvel.com/v1/public/characters/${characterId}/series`,
      items: Array(seriesCount)
        .fill(0)
        .map(() => ({
          resourceURI: `http://gateway.marvel.com/v1/public/series/${chance.integer(
            { max: 4000, min: 1000 }
          )}`,
          name: `${chance.word({ capitalize: true })}: ${chance.sentence({
            words: 5,
          })}`,
        })),
      returned: seriesCount,
    },

    stories: {
      available: storiesCount,
      collectionURI: `http://gateway.marvel.com/v1/public/characters/${characterId}/stories`,
      items: Array(storiesCount)
        .fill(0)
        .map(() => {
          const id = chance.integer({ max: 40000, min: 10000 });
          const type = chance.pickone(["cover", "interiorStory"]);
          return {
            resourceURI: `http://gateway.marvel.com/v1/public/stories/${id}`,
            name:
              type === "cover"
                ? `${chance.word({ capitalize: true })} #${id}`
                : `${chance.word({ capitalize: true })} ${chance.sentence({
                    words: 2,
                  })}`,
            type,
          };
        }),
      returned: storiesCount,
    },
    events: {
      available: eventsCount,
      collectionURI: `http://gateway.marvel.com/v1/public/characters/${characterId}/events`,
      items: Array(eventsCount)
        .fill(0)
        .map(() => ({
          resourceURI: `http://gateway.marvel.com/v1/public/events/${chance.integer(
            { max: 400000, min: 100000 }
          )}`,
          name: `${chance.word({ capitalize: true })}: ${chance.sentence({
            words: 2,
          })}`,
        })),
      returned: eventsCount,
    },

    urls: Array(urlsCount)
      .fill(0)
      .map(() => {
        const utm_source = chance.guid();
        return {
          type: chance.pickone(["detail", "wiki", "comiclink"]),
          url: `http://marvel.com/universe/${chacaterName.replace(
            / /g,
            "_"
          )})?utm_campaign=apiRef&utm_source=${utm_source}`,
        };
      }),
  };
};

export const mockMarvelHttpCharacterResponseOK = (): HttpResponse => ({
  statusCode: 200,
  data: {
    code: 200,
    status: "Ok",
    copyright: "© 2022 MARVEL",
    attributionText: "Data provided by Marvel. © 2022 MARVEL",
    attributionHTML:
      '<a href="http://marvel.com">Data provided by Marvel. © 2022 MARVEL</a>',
    etag: chance.guid(),
    data: {
      offset: 0,
      limit: 20,
      total: 1,
      count: 1,
      results: [mockMarvelCharacterHttp()],
    },
  },
});

export const mockMarvelHttpListCharactersResponseOK = (
  count: number = 1
): HttpResponse => ({
  statusCode: 200,
  data: {
    code: 200,
    status: "Ok",
    copyright: "© 2022 MARVEL",
    attributionText: "Data provided by Marvel. © 2022 MARVEL",
    attributionHTML:
      '<a href="http://marvel.com">Data provided by Marvel. © 2022 MARVEL</a>',
    etag: chance.guid(),
    data: {
      offset: 0,
      limit: 20,
      total: count,
      count: count,
      results: Array(count)
        .fill(0)
        .map(() => mockMarvelCharacterHttp()),
    },
  },
});
