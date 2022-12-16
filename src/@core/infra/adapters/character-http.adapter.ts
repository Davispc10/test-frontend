import { Character } from "@core/domain/entities/character";
import type {
  CharacterAdapter,
  CharacterAdapterFindAllParams,
  CharacterAdapterFindAllResult,
} from "@core/domain/adapters/character.adapter";
import { HttpClient } from "@core/data/protocols/http-client";
import { Comic } from "@core/domain/entities/comic";
import {
  ComicAdapterFindAllParams,
  ComicAdapterFindAllResult,
} from "@core/domain/adapters/comic.adapter";

export class CharacterHttpAdapter implements CharacterAdapter {
  constructor(private readonly http: HttpClient) {}
  async findComicsById(
    characterId: number,
    params: ComicAdapterFindAllParams
  ): Promise<ComicAdapterFindAllResult> {
    return this.http
      .request({
        method: "get",
        url: `/characters/${characterId}/comics`,
        params: {
          limit: String(params.limit),
          orderBy: String(params.orderBy),
          offset: String(params.offset),
        },
      })
      .then((res) => {
        const results = res.data?.data?.results;
        const available = res.data?.data?.total;
        const returned = res.data?.data?.count;

        if (!Array.isArray(results))
          throw new Error("Não foi possível accessar as comics!");

        return results
          ? {
              comics: results?.map(
                (comic: any) =>
                  new Comic({
                    id: comic.id,
                    title: comic.title,
                    description: comic.description,
                    modified: comic.modified,
                    thumbnail: comic.thumbnail,
                  })
              ),
              available,
              returned,
            }
          : null;
      });
  }

  async findAll(
    params: CharacterAdapterFindAllParams
  ): Promise<CharacterAdapterFindAllResult> {
    return this.http
      .request({
        method: "get",
        url: "/characters",
        params: {
          limit: String(params.limit),
          orderBy: String(params.orderBy),
          offset: String(params.offset),
        },
      })
      .then((res) => {
        const results = res.data?.data?.results;
        const available = res.data?.data?.total;
        const returned = res.data?.data?.count;

        if (!Array.isArray(results))
          throw new Error("Não foi possível acessar os personagens!");

        return results
          ? {
              characters: results?.map(
                (character: any) =>
                  new Character({
                    id: character.id,
                    name: character.name,
                    description: character.description,
                    modified: character.modified,
                    thumbnail: character.thumbnail,
                  })
              ),
              available,
              returned,
            }
          : null;
      });
  }

  async findById(id: number): Promise<Character> {
    return this.http
      .request({ method: "get", url: `/characters/${id}` })
      .then((res) => {
        const results = res.data?.data?.results;

        if (!Array.isArray(results))
          throw new Error("Não foi possível acessar o personagem!");

        const result = results[0];

        return result
          ? new Character({
              id: result.id,
              name: result.name,
              description: result.description,
              modified: result.modified,
              thumbnail: result.thumbnail,
            })
          : null;
      });
  }
}
