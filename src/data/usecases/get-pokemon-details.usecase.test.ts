import { describe, it, expect, vi } from "vitest";
import { GetPokemonDetailsUseCase } from "./get-pokemon-details.usecase";
import type { IPokemon } from "@/domain/entities/pokemon";

const mockPokemon: IPokemon = {
  id: 25,
  name: "pikachu",
  description: "Test",
  types: ["electric"],
  height: 4,
  weight: 60,
  stats: [],
  sprites: {
    frontDefault: "https://example.com/front.png",
    frontShiny: null,
    backDefault: null,
    backShiny: null,
  },
  abilities: [],
  generation: "1ª Geração",
  baseExperience: 112,
  captureRate: 190,
  baseHappiness: 70,
  eggGroups: ["field", "fairy"],
  evolutionChainUrl: "https://pokeapi.co/api/v2/evolution-chain/10/",
  habitat: "forest",
  color: "yellow",
  flavorTexts: [],
  varieties: [],
};

describe("GetPokemonDetailsUseCase", () => {
  it("chama repository.getById com o id passado e retorna o resultado", async () => {
    const mockRepo = {
      getById: vi.fn().mockResolvedValue(mockPokemon),
      getList: vi.fn(),
      getEvolutionChain: vi.fn(),
    };
    const useCase = new GetPokemonDetailsUseCase(mockRepo);
    const result = await useCase.execute("25");
    expect(mockRepo.getById).toHaveBeenCalledWith("25");
    expect(result).toEqual(mockPokemon);
  });

  it("aceita id numérico", async () => {
    const mockRepo = {
      getById: vi.fn().mockResolvedValue(mockPokemon),
      getList: vi.fn(),
      getEvolutionChain: vi.fn(),
    };
    const useCase = new GetPokemonDetailsUseCase(mockRepo);
    await useCase.execute(25);
    expect(mockRepo.getById).toHaveBeenCalledWith(25);
  });
});
