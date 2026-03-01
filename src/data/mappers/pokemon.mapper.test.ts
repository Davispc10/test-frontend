import { describe, it, expect } from "vitest";
import {
  mapPokemonDetails,
  mapPokemonListItemFromResponse,
  mapEvolutionChain,
  mapPokemonListResponse,
} from "./pokemon.mapper";
import {
  DEFAULT_POKEMON_IMAGE,
  DEFAULT_POKEMON_DESCRIPTION,
} from "@/lib/constants";
import type {
  IPokeApiPokemonResponse,
  IPokeApiPokemonSpeciesResponse,
  IPokeApiEvolutionChainLink,
  IPokeApiPokemonListResponse,
} from "./pokemon.dto";
import type { IPokemonListItem } from "@/domain/entities/pokemon";

const createMinimalPokemonDto = (
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
    types: [],
    stats: [],
    abilities: [],
    ...overrides,
  }) as IPokeApiPokemonResponse;

const createMinimalSpeciesDto = (
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

describe("PokemonMapper", () => {
  describe("mapPokemonDetails", () => {
    it("retorna IPokemon com fallbacks quando DTOs têm campos vazios", () => {
      const pokemonDto = createMinimalPokemonDto({
        sprites: {
          front_default: null,
          front_shiny: null,
          back_default: null,
          back_shiny: null,
        },
      });
      const speciesDto = createMinimalSpeciesDto({
        flavor_text_entries: [],
        generation: { name: "generation-i", url: "" },
      });
      const result = mapPokemonDetails(pokemonDto, speciesDto);

      expect(result.sprites.frontDefault).toBe(DEFAULT_POKEMON_IMAGE);
      expect(result.description).toBe(DEFAULT_POKEMON_DESCRIPTION);
      expect(result.generation).toBe("1ª Geração");
    });

    it("mapeia corretamente quando todos os campos estão preenchidos", () => {
      const pokemonDto = createMinimalPokemonDto({
        sprites: {
          front_default: "https://example.com/front.png",
          front_shiny: null,
          back_default: null,
          back_shiny: null,
          other: {
            "official-artwork": { front_default: "https://example.com/art.png" },
          },
        },
        types: [{ slot: 1, type: { name: "grass", url: "" } }],
        stats: [
          { base_stat: 45, effort: 0, stat: { name: "hp", url: "" } },
          { base_stat: 49, effort: 0, stat: { name: "attack", url: "" } },
        ],
        abilities: [
          {
            ability: { name: "overgrow", url: "" },
            is_hidden: false,
            slot: 1,
          },
        ],
      });
      const speciesDto = createMinimalSpeciesDto({
        flavor_text_entries: [
          {
            flavor_text: "A strange seed.",
            language: { name: "en" },
            version: { name: "red", url: "" },
          },
        ],
      });
      const result = mapPokemonDetails(pokemonDto, speciesDto);

      expect(result.sprites.other?.officialArtwork).toBe(
        "https://example.com/art.png"
      );
      expect(result.description).toBe("A strange seed.");
      expect(result.types).toEqual(["grass"]);
      expect(result.stats).toHaveLength(2);
      expect(result.abilities).toHaveLength(1);
      expect(result.abilities[0].name).toBe("overgrow");
    });

    it("extrai flavor texts em inglês, deduplicados, máx 5", () => {
      const speciesDto = createMinimalSpeciesDto({
        flavor_text_entries: [
          { flavor_text: "Text A", language: { name: "en" }, version: { name: "red", url: "" } },
          { flavor_text: "Text A", language: { name: "en" }, version: { name: "blue", url: "" } },
          { flavor_text: "Text B", language: { name: "en" }, version: { name: "yellow", url: "" } },
          { flavor_text: "Text C", language: { name: "en" }, version: { name: "gold", url: "" } },
          { flavor_text: "Text D", language: { name: "en" }, version: { name: "silver", url: "" } },
          { flavor_text: "Text E", language: { name: "en" }, version: { name: "crystal", url: "" } },
        ],
      });
      const result = mapPokemonDetails(createMinimalPokemonDto(), speciesDto);

      expect(result.flavorTexts).toHaveLength(5);
      expect(result.flavorTexts.map((ft) => ft.text)).toEqual([
        "Text A",
        "Text B",
        "Text C",
        "Text D",
        "Text E",
      ]);
    });

    it("aplica fallback quando generation é null", () => {
      const speciesDto = createMinimalSpeciesDto({
        generation: undefined as unknown as { name: string; url: string },
      });
      const result = mapPokemonDetails(createMinimalPokemonDto(), speciesDto);
      expect(result.generation).toBe("");
    });

    it("retorna valor original para gerações desconhecidas", () => {
      const speciesDto = createMinimalSpeciesDto({
        generation: { name: "generation-unknown", url: "" },
      });
      const result = mapPokemonDetails(createMinimalPokemonDto(), speciesDto);
      expect(result.generation).toBe("generation-unknown");
    });

    it("extrai variedades não-default", () => {
      const speciesDto = createMinimalSpeciesDto({
        varieties: [
          { is_default: true, pokemon: { name: "charizard", url: "" } },
          { is_default: false, pokemon: { name: "charizard-mega-x", url: "" } },
          { is_default: false, pokemon: { name: "charizard-mega-y", url: "" } },
        ],
      });
      const result = mapPokemonDetails(createMinimalPokemonDto(), speciesDto);
      expect(result.varieties).toEqual([
        "charizard-mega-x",
        "charizard-mega-y",
      ]);
    });
  });

  describe("mapPokemonListItemFromResponse", () => {
    it("aplica toImageUrl quando official-artwork e front_default são null", () => {
      const dto = createMinimalPokemonDto({
        sprites: {
          front_default: null,
          front_shiny: null,
          back_default: null,
          back_shiny: null,
        },
      });
      const result = mapPokemonListItemFromResponse(dto);
      expect(result.imageUrl).toBe(DEFAULT_POKEMON_IMAGE);
    });

    it("usa official-artwork quando disponível", () => {
      const dto = createMinimalPokemonDto({
        sprites: {
          front_default: "https://example.com/front.png",
          front_shiny: null,
          back_default: null,
          back_shiny: null,
          other: {
            "official-artwork": { front_default: "https://example.com/art.png" },
          },
        },
      });
      const result = mapPokemonListItemFromResponse(dto);
      expect(result.imageUrl).toBe("https://example.com/art.png");
    });
  });

  describe("mapEvolutionChain", () => {
    it("retorna null para null/undefined", () => {
      expect(mapEvolutionChain(null)).toBeNull();
      expect(mapEvolutionChain(undefined)).toBeNull();
    });

    it("retorna null para objeto sem species.name", () => {
      expect(
        mapEvolutionChain({ species: { name: "", url: "" }, evolves_to: [] })
      ).toBeNull();
      expect(
        mapEvolutionChain({ evolves_to: [] } as unknown as IPokeApiEvolutionChainLink)
      ).toBeNull();
    });

    it("mapeia cadeia linear com evolves_to vazio", () => {
      const link: IPokeApiEvolutionChainLink = {
        species: { name: "pikachu", url: "" },
        evolves_to: [],
      };
      const result = mapEvolutionChain(link);
      expect(result).toEqual({ name: "pikachu", evolvesTo: [] });
    });

    it("mapeia cadeia ramificada com múltiplos evolves_to", () => {
      const link: IPokeApiEvolutionChainLink = {
        species: { name: "eevee", url: "" },
        evolves_to: [
          { species: { name: "vaporeon", url: "" }, evolves_to: [] },
          { species: { name: "jolteon", url: "" }, evolves_to: [] },
        ],
      };
      const result = mapEvolutionChain(link);
      expect(result).toEqual({
        name: "eevee",
        evolvesTo: [
          { name: "vaporeon", evolvesTo: [] },
          { name: "jolteon", evolvesTo: [] },
        ],
      });
    });

    it("mapeia recursivamente 2 níveis (bulbasaur -> ivysaur -> venusaur)", () => {
      const link: IPokeApiEvolutionChainLink = {
        species: { name: "bulbasaur", url: "" },
        evolves_to: [
          {
            species: { name: "ivysaur", url: "" },
            evolves_to: [
              { species: { name: "venusaur", url: "" }, evolves_to: [] },
            ],
          },
        ],
      };
      const result = mapEvolutionChain(link);
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

  describe("mapPokemonListResponse", () => {
    const mockItems: IPokemonListItem[] = [
      {
        id: 1,
        name: "bulbasaur",
        imageUrl: "",
        types: ["grass"],
        baseExperience: 64,
        stats: [],
      },
    ];

    it("calcula totalPages, currentPage, nextPage e previousPage corretamente", () => {
      const dto: IPokeApiPokemonListResponse = {
        count: 100,
        next: "https://pokeapi.co/api/v2/pokemon?offset=20",
        previous: "https://pokeapi.co/api/v2/pokemon?offset=0",
        results: [],
      };
      const result = mapPokemonListResponse(dto, 20, 20, mockItems);
      expect(result.totalCount).toBe(100);
      expect(result.items).toEqual(mockItems);
      expect(result.nextPage).toBe(3);
      expect(result.previousPage).toBe(1);
    });

    it("retorna nextPage null na última página", () => {
      const dto: IPokeApiPokemonListResponse = {
        count: 25,
        next: null,
        previous: "https://pokeapi.co/api/v2/pokemon?offset=0",
        results: [],
      };
      const result = mapPokemonListResponse(dto, 20, 20, mockItems);
      expect(result.nextPage).toBeNull();
      expect(result.previousPage).toBe(1);
    });

    it("retorna previousPage null na primeira página", () => {
      const dto: IPokeApiPokemonListResponse = {
        count: 100,
        next: "https://pokeapi.co/api/v2/pokemon?offset=20",
        previous: null,
        results: [],
      };
      const result = mapPokemonListResponse(dto, 0, 20, mockItems);
      expect(result.previousPage).toBeNull();
      expect(result.nextPage).toBe(2);
    });
  });
});
