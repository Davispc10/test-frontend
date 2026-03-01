import { PokeApiClient } from "@/infra/http/pokeapi-client";
import { PokeApiPokemonRepository } from "@/data/repositories/pokeapi-pokemon.repository";
import { GetPokemonListUseCase } from "@/data/usecases/get-pokemon-list.usecase";
import { GetPokemonDetailsUseCase } from "@/data/usecases/get-pokemon-details.usecase";

/**
 * Container de Injeção de Dependência (simplificado).
 * Em produção, pode ser substituído por um IoC container (tsyringe, inversify, etc.)
 */
const pokeApiClient = new PokeApiClient();
export const pokemonRepository = new PokeApiPokemonRepository(pokeApiClient);

export const getPokemonListUseCase = new GetPokemonListUseCase(pokemonRepository);
export const getPokemonDetailsUseCase = new GetPokemonDetailsUseCase(
  pokemonRepository
);
