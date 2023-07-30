const base = {
  characters: "/characters",
  comics: "/comics",
  creators: "/creators",
};

export const API_LINKS = {
  characters: base.characters,
  characterDetails: (characterId: string) =>
    `${base.characters}/${characterId}`,
  characterComics: (characterId: string) =>
    `${base.characters}/${characterId}/comics`,
  characterEvents: (characterId: string) =>
    `${base.characters}/${characterId}/events`,
  characterSeries: (characterId: string) =>
    `${base.characters}/${characterId}/series`,
  characterStories: (characterId: string) =>
    `${base.characters}/${characterId}/stories`,

  comics: base.comics,
  comicCharacters: (comicId: string) => `${base.comics}/${comicId}/characters`,
  comicCreators: (comicId: string) => `${base.comics}/${comicId}/creators`,
  comicEvents: (comicId: string) => `${base.comics}/${comicId}/events`,
  comicStories: (comicId: string) => `${base.comics}/${comicId}/stories`,

  creators: base.creators,
  creatorComics: (creatorId: string) => `${base.creators}/${creatorId}/comics`,
  creatorEvents: (creatorId: string) => `${base.creators}/${creatorId}/events`,
  creatorSeries: (creatorId: string) => `${base.creators}/${creatorId}/series`,
  creatorStories: (creatorId: string) =>
    `${base.creators}/${creatorId}/stories`,
};
