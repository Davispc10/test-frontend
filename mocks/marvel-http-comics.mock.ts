import { HttpResponse } from "@core/data/protocols/http-client";
import { Chance } from "chance";

const chance = Chance();

export const mockMarvelComicHttp = (): any => {
  const comicId = chance.integer({ max: 33333, min: 10000 });
  const digitalId = chance.integer({ max: 33333, min: 10000 });
  const chacaterName = chance.name();
  const issueNumber = chance.integer({ min: 0, max: 1000 });

  const characterCount = chance.integer({ max: 3, min: 1 });
  const creatorsCount = chance.integer({ max: 4, min: 1 });
  const eventsCount = chance.integer({ max: 3, min: 1 });
  const storiesCount = chance.integer({ max: 8, min: 1 });

  return {
    id: comicId,
    digitalId,
    title: `${chance.name()} #${chance.integer({ min: 0, max: 100 })}`,
    issueNumber,
    variantDescription: chance.sentence(),
    description: chance.pickone([null, chance.sentence()]),
    modified: chance.date(),
    isbn: "",
    upc: "",
    diamondCode: "",
    ean: "",
    issn: "",
    format: "Comic",
    pageCount: 0,
    textObjects: [],
    resourceURI: `http://gateway.marvel.com/v1/public/comics/${comicId}`,
    urls: [
      {
        type: "detail",
        url: `http://marvel.com/comics/issue/${issueNumber}/marvel_premiere_1972_36?utm_campaign=apiRef&utm_source=3eb72df7245fbeb1697b464cdad7642e`,
      },
    ],
    series: {
      resourceURI: `http://gateway.marvel.com/v1/public/series/${chance.integer(
        { max: 4000, min: 1000 }
      )}`,
      name: `${chance.word({ capitalize: true })}: ${chance.sentence({
        words: 5,
      })}`,
    },
    variants: [],
    collections: [],
    collectedIssues: [],
    dates: [
      {
        type: "onsaleDate",
        date: chance.date(),
      },
      {
        type: "focDate",
        date: chance.date(),
      },
    ],
    prices: [
      {
        type: "printPrice",
        price: 0,
      },
    ],
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
      extension: "jpg",
    },
    images: [],
    creators: {
      available: creatorsCount,
      collectionURI: `http://gateway.marvel.com/v1/public/comics/${comicId}/creators`,
      items: Array(creatorsCount)
        .fill(0)
        .map(() => ({
          resourceURI: `http://gateway.marvel.com/v1/public/creators/${chance.integer(
            { min: 1000, max: 5000 }
          )}`,
          name: chance.name(),
          role: chance.pickone(["penciler", "writer", "inker", "letterer"]),
        })),
      returned: creatorsCount,
    },
    characters: {
      available: characterCount,
      collectionURI: `http://gateway.marvel.com/v1/public/comics/${comicId}/characters`,
      items: Array(characterCount)
        .fill(0)
        .map(() => ({
          resourceURI: `http://gateway.marvel.com/v1/public/characters/${chance.integer(
            { min: 1000, max: 5000 }
          )}`,
          name: chance.name(),
        })),
      returned: characterCount,
    },
    stories: {
      available: storiesCount,
      collectionURI: `http://gateway.marvel.com/v1/public/comics/${comicId}/series`,
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
      collectionURI: `http://gateway.marvel.com/v1/public/comics/${comicId}/events`,
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
  };
};

export const mockMarvelHttpComicResponseOK = (): HttpResponse => ({
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
      results: [mockMarvelComicHttp()],
    },
  },
});

export const mockMarvelHttpListComicsResponseOK = (
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
        .map(() => mockMarvelComicHttp()),
    },
  },
});
