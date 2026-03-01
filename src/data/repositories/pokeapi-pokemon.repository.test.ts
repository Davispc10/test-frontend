import { describe, it, expect, vi, beforeEach } from "vitest";
import { PokeApiPokemonRepository } from "./pokeapi-pokemon.repository";
import { PokeApiClient } from "@/infra/http/pokeapi-client";
import type {
  IPokeApiPokemonListResponse,
  IPokeApiPokemonResponse,
  IPokeApiPokemonSpeciesResponse,
  IPokeApiEvolutionChainResponse,
} from "@/data/mappers/pokemon.dto";

const createMockPokemonDto = (
  overrides: Partial<IPokeApiPokemonResponse> = {}
): IPokeApiPokemonResponse =>
  ({
    id: 1,
    name: "bulbasaur",
    height: 7,
    weight: 69,
    base_experience: 64,
    sprites: {
      front_default: null,
      front_shiny: null,
      back_default: null,
      back_shiny: null,
    },
    types: [{ slot: 1, type: { name: "grass", url: "" } }],
    stats: [],
    abilities: [],
    ...overrides,
  }) as IPokeApiPokemonResponse;

const createMockSpeciesDto = (
  overrides: Partial<IPokeApiPokemonSpeciesResponse> = {}
): IPokeApiPokemonSpeciesResponse =>
  ({
    id: 1,
    name: "bulbasaur",
    flavor_text_entries: [],
    generation: { name: "generation-i", url: "" },
    capture_rate: 45,
    base_happiness: 70,
    egg_groups: [],
    evolution_chain: { url: "" },
    habitat: null,
    color: { name: "green", url: "" },
    ...overrides,
  }) as IPokeApiPokemonSpeciesResponse;

describe("PokeApiPokemonRepository", () => {
  let mockClient: { get: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockClient = { get: vi.fn() };
  });

  describe("getList", () => {
    it("chama /pokemon?limit=X&offset=Y e mapeia resultados (default, sem filtros)", async () => {
      const listDto: IPokeApiPokemonListResponse = {
        count: 100,
        next: "https://pokeapi.co/api/v2/pokemon?offset=20",
        previous: null,
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        ],
      };
      const pokemonDto = createMockPokemonDto({ id: 1, name: "bulbasaur" });

      mockClient.get
        .mockResolvedValueOnce(listDto)
        .mockResolvedValueOnce(pokemonDto);

      const repo = new PokeApiPokemonRepository(mockClient as unknown as PokeApiClient);
      const result = await repo.getList({ page: 1, limit: 20 });

      expect(mockClient.get).toHaveBeenNthCalledWith(
        1,
        "/pokemon?limit=20&offset=0"
      );
      expect(mockClient.get).toHaveBeenNthCalledWith(2, "/pokemon/1");
      expect(result.items).toHaveLength(1);
      expect(result.items[0].name).toBe("bulbasaur");
      expect(result.totalCount).toBe(100);
      expect(result.nextPage).toBe(2);
      expect(result.previousPage).toBeNull();
    });
  });

  describe("getById", () => {
    it("chama /pokemon/{id} e /pokemon-species/{id} e retorna IPokemon", async () => {
      const pokemonDto = createMockPokemonDto({ id: 25, name: "pikachu" });
      const speciesDto = createMockSpeciesDto({ id: 25, name: "pikachu" });

      mockClient.get
        .mockResolvedValueOnce(pokemonDto)
        .mockResolvedValueOnce(speciesDto);

      const repo = new PokeApiPokemonRepository(mockClient as unknown as PokeApiClient);
      const result = await repo.getById(25);

      expect(mockClient.get).toHaveBeenNthCalledWith(1, "/pokemon/25");
      expect(mockClient.get).toHaveBeenNthCalledWith(2, "/pokemon-species/25");
      expect(result.id).toBe(25);
      expect(result.name).toBe("pikachu");
    });

    it("aceita id como string", async () => {
      const pokemonDto = createMockPokemonDto({ id: 25, name: "pikachu" });
      const speciesDto = createMockSpeciesDto({ id: 25, name: "pikachu" });

      mockClient.get
        .mockResolvedValueOnce(pokemonDto)
        .mockResolvedValueOnce(speciesDto);

      const repo = new PokeApiPokemonRepository(mockClient as unknown as PokeApiClient);
      await repo.getById("25");

      expect(mockClient.get).toHaveBeenNthCalledWith(1, "/pokemon/25");
      expect(mockClient.get).toHaveBeenNthCalledWith(2, "/pokemon-species/25");
    });
  });

  describe("getEvolutionChain", () => {
    it("retorna null para URL vazia", async () => {
      const repo = new PokeApiPokemonRepository(mockClient as unknown as PokeApiClient);

      expect(await repo.getEvolutionChain("")).toBeNull();
      expect(await repo.getEvolutionChain("   ")).toBeNull();
      expect(mockClient.get).not.toHaveBeenCalled();
    });

    it("chama URL passada e retorna mapEvolutionChain(chain)", async () => {
      const evolutionUrl = "https://pokeapi.co/api/v2/evolution-chain/1/";
      const dto: IPokeApiEvolutionChainResponse = {
        chain: {
          species: { name: "bulbasaur", url: "" },
          evolves_to: [
            {
              species: { name: "ivysaur", url: "" },
              evolves_to: [
                {
                  species: { name: "venusaur", url: "" },
                  evolves_to: [],
                },
              ],
            },
          ],
        },
      };

      mockClient.get.mockResolvedValueOnce(dto);

      const repo = new PokeApiPokemonRepository(mockClient as unknown as PokeApiClient);
      const result = await repo.getEvolutionChain(evolutionUrl);

      expect(mockClient.get).toHaveBeenCalledWith(evolutionUrl);
      expect(result).toEqual({
        name: "bulbasaur",
        evolvesTo: [
          {
            name: "ivysaur",
            evolvesTo: [
              { name: "venusaur", evolvesTo: [] },
            ],
          },
        ],
      });
    });
  });
});
