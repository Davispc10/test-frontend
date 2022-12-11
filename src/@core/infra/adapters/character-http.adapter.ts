import { Character } from "@core/domain/entities/character";
import { CharacterAdapter } from "@core/domain/adapters/character.adapter";
import { HttpClient } from "@core/data/protocols/http-client";

export class CharacterHttpAdapter implements CharacterAdapter {
  constructor(private readonly http: HttpClient) {}

  async findAll(): Promise<Character[]> {
    return this.http
      .request({
        method: "get",
        url: "/characters",
      })
      .then((res) => {
        const results = res.data?.data?.results;

        if (!Array.isArray(results)) throw new Error("Results is not a list!");

        return (
          results?.map(
            (character: any) =>
              new Character({
                id: character.id,
                name: character.name,
                description: character.description,
                modified: character.modified,
                resourceURI: character.resourceURI,
                urls: character.urls,
                thumbnail: character.thumbnail,
                comics: character.comics.items,
              })
          ) ?? null
        );
      });
  }

  async findById(id: number): Promise<Character> {
    return this.http
      .request({ method: "get", url: `/characters/${id}` })
      .then((res) => {
        const results = res.data?.data?.results;

        if (!Array.isArray(results)) throw new Error("Results is not a list!");

        const result = results[0];

        return result
          ? new Character({
              id: result.id,
              name: result.name,
              description: result.description,
              modified: result.modified,
              resourceURI: result.resourceURI,
              urls: result.urls,
              thumbnail: result.thumbnail,
              comics: result.comics.items,
            })
          : null;
      });
  }
}
