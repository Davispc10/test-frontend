import { api } from "./api";

export type Characters = {
  id: string;
  name: string;
  thumbnail: string;
}[];

interface Character {
  id: string;
  name: string;
  description: string;
  images: string[];
}
export function getCharacters(): Promise<Characters> {
  return api.get("/v1/public/characters").then((response) => {
    const result = response.data.data.results;

    const charactersResponse: Characters = result.map((character: any) => ({
      id: character.id,
      name: character.name,
      description:
        character.description === ""
          ? "uninformed description"
          : character.description,
      thumbnail:
        character.thumbnail.path ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
          ? "https://i0.wp.com/cloud.estacaonerd.com/wp-content/uploads/2019/03/14122530/marvel.jpg"
          : `${character.thumbnail.path}.${character.thumbnail.extension}`,
    }));

    return charactersResponse;
  });
}

export async function getCharacter(id: string): Promise<Character> {
  const characterResult = await api
    .get(`/v1/public/characters/${id}`)
    .then((response) => {
      return response.data.data.results[0];
    });

  const comicsImageResult: string[] = await api
    .get(`/v1/public/characters/${id}/comics`)
    .then((response) => {
      const result = response.data.data.results[0].images;
      const images: string[] = [];
      result.map((image: any) => {
        images.push(`${image.path}.${image.extension}`);
      });
      return images;
    })
    .catch((error) => {
      return [
        "https://i0.wp.com/cloud.estacaonerd.com/wp-content/uploads/2019/03/14122530/marvel.jpg",
      ];
    });

  const characters: Character = {
    id: characterResult.id,
    name: characterResult.name,
    description:
      characterResult.description === ""
        ? "uninformed description"
        : characterResult.description,
    images: comicsImageResult,
  };
  return characters;
}
