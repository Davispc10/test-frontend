import { Hero } from "@/types/heroes";

export const hero: Hero = {
  id: 123,
  name: "Spider-Man",
  description: "A friendly neighborhood superhero.",
  modified: "2023-07-30T12:34:56-04:00",
  thumbnail: {
    path: "https://random.com/spider-man",
    extension: "jpg",
  },
  resourceURI: "https://random.com/characters/123",
  comics: {
    available: 100,
    collectionURI: "https://random.com/characters/123/comics",
    items: [
      {
        resourceURI: "https://random.com/comic/1",
        name: "The Amazing Spider-Man #1",
      },
      {
        resourceURI: "https://random.com/comic/2",
        name: "The Spectacular Spider-Man #1",
      },
    ],
    returned: 2,
  },
  series: {
    available: 50,
    collectionURI: "https://random.com/characters/123/series",
    items: [
      {
        resourceURI: "https://random.com/series/1",
        name: "The Amazing Spider-Man",
      },
      {
        resourceURI: "https://random.com/series/2",
        name: "The Spectacular Spider-Man",
      },
    ],
    returned: 2,
  },
  stories: {
    available: 200,
    collectionURI: "https://random.com/characters/123/stories",
    items: [
      { resourceURI: "https://random.com/story/1", name: "Origin Story" },
      {
        resourceURI: "https://random.com/story/2",
        name: "The Black Suit Saga",
      },
    ],
    returned: 2,
  },
  events: {
    available: 10,
    collectionURI: "https://random.com/characters/123/events",
    items: [
      { resourceURI: "https://random.com/event/1", name: "Secret Wars" },
      { resourceURI: "https://random.com/event/2", name: "Spider-Verse" },
    ],
    returned: 2,
  },
  urls: [
    { type: "detail", url: "https://random.com/characters/123" },
    { type: "wiki", url: "https://random.com/wiki/spider-man" },
  ],
};
