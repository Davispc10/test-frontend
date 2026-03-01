import type {
  IPokemonRepository,
  IGetPokemonListParams,
} from "@/domain/repositories/pokemon-repository.interface";
import type {
  IPokemon,
  IPokemonList,
  IEvolutionChainNode,
} from "@/domain/entities/pokemon";

/**
 * Mock do repositório para testes Jest.
 * Implementa IPokemonRepository sem chamadas HTTP.
 */
export class MockPokemonRepository implements IPokemonRepository {
  private mockList: IPokemonList | null = null;
  private mockDetails: IPokemon | null = null;

  setMockList(data: IPokemonList) {
    this.mockList = data;
  }

  setMockDetails(data: IPokemon) {
    this.mockDetails = data;
  }

  async getList(_params: IGetPokemonListParams): Promise<IPokemonList> {
    if (this.mockList) return this.mockList;
    return {
      items: [],
      totalCount: 0,
      nextPage: null,
      previousPage: null,
    };
  }

  async getById(_id: string | number): Promise<IPokemon> {
    if (this.mockDetails) return this.mockDetails;
    throw new Error("Mock not configured");
  }

  async getEvolutionChain(_url: string): Promise<IEvolutionChainNode | null> {
    return null;
  }
}
