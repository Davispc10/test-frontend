import { Character } from "../types/character";
import { Comic } from "../types/comic";

export const processCharacterData = (character: Character) => {
  if (!character.thumbnail || character.thumbnail.path.includes('image_not_available')) {
    character.thumbnail = {
      path: '/marvel-logo',
      extension: 'webp',
    };
  }

  if (!character.description) {
    character.description = 'Descrição não informada';
  }

  return character;
};

export const processComicData = (comic: Comic) => {
  if (!comic.thumbnail || comic.thumbnail.path.includes('image_not_available')) {
    comic.thumbnail = {
      path: '/marvel-logo',
      extension: 'webp',
    };
  }

  return comic;
};