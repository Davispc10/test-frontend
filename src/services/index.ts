import * as U from '@/utils';

const BASE_URL = 'https://gateway.marvel.com/v1/public';
const API_KEY = 'ba01d20b13afc1bc5a2c1bd6916aee66';
const HASH = '8976acf46a2a16d9adec8a821daa0300';
const CURRENT_TIMESTAMP = '1690512233';

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

export async function retrieveCharactersList(offset: number, name?: string) {
  const characters: any = await getCharactersList(offset, name);
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
  const character: any = await getCharacter(id);
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
  const comics: any = await getCharacterComics(id);
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
