import type {
  IPokemon,
  IPokemonList,
  IEvolutionChainNode,
} from "../entities/pokemon";

export interface IGetPokemonListParams {
  page: number;
  limit: number;
  search?: string;
  types?: string[];
  minAttack?: number;
  maxAttack?: number;
  minExperience?: number;
  maxExperience?: number;
  generation?: string;
  color?: string;
  habitat?: string;
}

export interface IPokemonRepository {
  getList(params: IGetPokemonListParams): Promise<IPokemonList>;
  getById(id: string | number): Promise<IPokemon>;
  getEvolutionChain(url: string): Promise<IEvolutionChainNode | null>;
}
