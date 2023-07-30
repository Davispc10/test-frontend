const base = {
  characters: "/characters",
  comics: "/comics",
  creators: "/creators",
};

export const API_LINKS = {
  characters: base.characters,
  characterComics: (characterId: number) =>
    `${base.characters}/${characterId}/comics`,
  characterEvents: (characterId: number) =>
    `${base.characters}/${characterId}/events`,
  characterSeries: (characterId: number) =>
    `${base.characters}/${characterId}/series`,
  characterStories: (characterId: number) =>
    `${base.characters}/${characterId}/stories`,

  comics: base.comics,
  comicCharacters: (comicId: number) => `${base.comics}/${comicId}/characters`,
  comicCreators: (comicId: number) => `${base.comics}/${comicId}/creators`,
  comicEvents: (comicId: number) => `${base.comics}/${comicId}/events`,
  comicStories: (comicId: number) => `${base.comics}/${comicId}/stories`,

  creators: base.creators,
  creatorComics: (creatorId: number) => `${base.creators}/${creatorId}/comics`,
  creatorEvents: (creatorId: number) => `${base.creators}/${creatorId}/events`,
  creatorSeries: (creatorId: number) => `${base.creators}/${creatorId}/series`,
  creatorStories: (creatorId: number) =>
    `${base.creators}/${creatorId}/stories`,
};
