import * as U from '@/utils';

const BASE_URL = 'https://gateway.marvel.com/v1/public';
const API_KEY = '3c39df8638814e5c70d677e936f922e6';
const HASH = '4ae72289237b4e7d12eb5310f4f04339';
const CURRENT_TIMESTAMP = '1690728768';

export async function getCharactersList(offset: number, name?: string) {
  let url = `${BASE_URL}/characters?ts=${CURRENT_TIMESTAMP}&apikey=${API_KEY}&hash=${HASH}&offset=${offset}`;
  if (name) {
    url += `&nameStartsWith=${name}`;
  }
  try {
    const data = await fetch(url);
    return data.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCharacter(id: string) {
  try {
    const data = await fetch(
      `${BASE_URL}/characters/${id}?ts=${CURRENT_TIMESTAMP}&apikey=${API_KEY}&hash=${HASH}`
    );
    return data.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getCharacterComics(id: string) {
  try {
    const data = await fetch(
      `${BASE_URL}/characters/${id}/comics?ts=${CURRENT_TIMESTAMP}&apikey=${API_KEY}&hash=${HASH}`
    );
    return data.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface CharacterResponse {
  data: {
    results: any[];
  };
}

export async function retrieveCharactersList(offset: number, name?: string) {
  const characters: CharacterResponse = await getCharactersList(offset, name);
  const charactersResults = characters?.data?.results;
  const charactersInfo = charactersResults.map((character: any) => {
    const { id, name, thumbnail } = character;
    const image = U.getThumbnailContent(thumbnail);
    return {
      id,
      name,
      image,
    };
  });

  return charactersInfo;
}

export async function retrieveCharacterInfo(id: string) {
  const character: CharacterResponse = await getCharacter(id);
  const characterResults = character?.data?.results[0];
  const { name, description, thumbnail } = characterResults;
  const descriptionText =
    description || 'This character does not have a description.';
  const mainName: string = U.getTextOutsideParenthesis(name);
  const subName: string = U.getWordInParentheses(name);
  const image = U.getThumbnailContent(thumbnail);

  return {
    mainName,
    subName,
    descriptionText,
    image,
  };
}

export async function retrieveCharacterComicsInfo(id: string) {
  const comics: CharacterResponse = await getCharacterComics(id);
  const comicsResults = comics?.data?.results;
  const comicsInfo = comicsResults.map((comic: any) => {
    const { title, description, thumbnail } = comic;
    const descriptionText =
      description || 'This comic does not have a description.';
    const image = U.getThumbnailContent(thumbnail);
    return {
      title,
      descriptionText,
      image,
    };
  });

  return comicsInfo;
}
