import { Character } from "@core/domain/entities/character";

/**
 * Esta interface define nosso adaptador para os métodos da nossa entidade Character,
 * onde iremos definir os métodos que serão implementados em nossa infraestrutura.
 */
export interface CharacterAdapter {
  /**
   * GET /characters
   */
  findAll(): Promise<Character[]>;

  /**
   * GET /characters/{@param id}
   */
  findById(id: number): Promise<Character>;
}
