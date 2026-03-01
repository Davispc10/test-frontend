import type { IPokemonRepository, IGetPokemonListParams } from "@/domain/repositories/pokemon-repository.interface";
import type { IPokemonList } from "@/domain/entities/pokemon";

/**
 * Use Case: obter listagem de Pokémon.
 * Recebe o repositório por injeção para permitir testes com mock.
 */
export class GetPokemonListUseCase {
  constructor(private readonly repository: IPokemonRepository) {}

  async execute(params: IGetPokemonListParams): Promise<IPokemonList> {
    return this.repository.getList(params);
  }
}
