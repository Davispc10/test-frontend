import { Comic } from "@core/domain/entities/comic";
import {
  CharacterAdapterFindAllParams,
  CharacterAdapterFindAllResult,
} from "./character.adapter";

export type ComicOrderBy =
  | "focDate"
  | "onsaleDate"
  | "title"
  | "issueNumber"
  | "modified"
  | "-focDate"
  | "-onsaleDate"
  | "-title"
  | "-issueNumber"
  | "-modified";

export type ComicAdapterFindAllParams = {
  limit: number;
  offset: number;
  orderBy: ComicOrderBy;
};

export type ComicAdapterFindAllResult = {
  comics: Comic[];
  available: number;
  returned: number;
};

export type ComicAdapterFindByIdResult = Comic;

/**
 * Esta interface define nosso adaptador para os métodos da nossa entidade Comic,
 * onde iremos definir os métodos que serão implementados em nossa infraestrutura.
 */
export interface ComicAdapter {
  /**
   * GET /comics
   */
  findAll(
    params: ComicAdapterFindAllParams
  ): Promise<ComicAdapterFindAllResult>;

  /**
   * GET /comics/{@param comicId}
   */
  findById(comicId: number): Promise<ComicAdapterFindByIdResult>;

  /**
   *
   * GET /comics/{@param comicId}/characters
   */
  findCharactersById(
    comicId: number,
    params: CharacterAdapterFindAllParams
  ): Promise<CharacterAdapterFindAllResult>;
}
