import { Character } from "@core/domain/entities/character";
import {
  ComicAdapterFindAllParams,
  ComicAdapterFindAllResult,
} from "./comic.adapter";

export type CharacterOrderBy = "name" | "modified" | "-name" | "-modified";

export type CharacterAdapterFindAllParams = {
  limit: number;
  offset: number;
  orderBy: CharacterOrderBy;
};

export type CharacterAdapterFindAllResult = {
  characters: Character[];
  available: number;
  returned: number;
};

export type CharacterAdapterFindByIdResult = Character;

/**
 * Esta interface define nosso adaptador para os métodos da nossa entidade Character,
 * onde iremos definir os métodos que serão implementados em nossa infraestrutura.
 */
export interface CharacterAdapter {
  /**
   * GET /characters
   */
  findAll(
    params: CharacterAdapterFindAllParams
  ): Promise<CharacterAdapterFindAllResult>;

  /**
   * GET /characters/{@param characterId}
   */
  findById(characterId: number): Promise<CharacterAdapterFindByIdResult>;

  /**
   * GET /characters/{@param characterId}/comics
   */
  findComicsById(
    characterId: number,
    params: ComicAdapterFindAllParams
  ): Promise<ComicAdapterFindAllResult>;
}
