import { Comic } from "@core/domain/entities/comic";
import { Character } from "@core/domain/entities/character";
import type {
  ComicAdapter,
  ComicAdapterFindAllParams,
  ComicAdapterFindAllResult,
} from "@core/domain/adapters/comic.adapter";
import { HttpClient } from "@core/data/protocols/http-client";
import {
  CharacterAdapterFindAllParams,
  CharacterAdapterFindAllResult,
} from "@core/domain/adapters/character.adapter";

export class ComicHttpAdapter implements ComicAdapter {
  constructor(private readonly http: HttpClient) {}
  async findCharactersById(
    comicId: number,
    params: CharacterAdapterFindAllParams
  ): Promise<CharacterAdapterFindAllResult> {
    return this.http
      .request({
        method: "get",
        url: `/comics/${comicId}/characters`,
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
          throw new Error("Não foi possível accessar os characters!");

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
  findAll(
    params: ComicAdapterFindAllParams
  ): Promise<ComicAdapterFindAllResult> {
    return this.http
      .request({
        method: "get",
        url: `/comics`,
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
  findById(comicId: number): Promise<Comic> {
    return this.http
      .request({ method: "get", url: `/comics/${comicId}` })
      .then((res) => {
        const results = res.data?.data?.results;

        if (!Array.isArray(results))
          throw new Error("Não foi possível acessar a comic!");

        const result = results[0];

        return result
          ? new Comic({
              id: result.id,
              title: result.title,
              description: result.description,
              modified: result.modified,
              thumbnail: result.thumbnail,
            })
          : null;
      });
  }
}
