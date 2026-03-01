import type { IPokemonRepository } from "@/domain/repositories/pokemon-repository.interface";
import type { IPokemon } from "@/domain/entities/pokemon";

/**
 * Use Case: obter detalhes de um Pokémon.
 * Recebe o repositório por injeção para permitir testes com mock.
 */
export class GetPokemonDetailsUseCase {
  constructor(private readonly repository: IPokemonRepository) {}

  async execute(id: string | number): Promise<IPokemon> {
    return this.repository.getById(id);
  }
}
