import { describe, it, expect, vi } from "vitest";
import { GetPokemonListUseCase } from "./get-pokemon-list.usecase";
import type { IPokemonList } from "@/domain/entities/pokemon";
import type { IGetPokemonListParams } from "@/domain/repositories/pokemon-repository.interface";

const mockList: IPokemonList = {
  items: [],
  totalCount: 0,
  nextPage: null,
  previousPage: null,
};

describe("GetPokemonListUseCase", () => {
  it("chama repository.getList com os parâmetros passados e retorna o resultado", async () => {
    const params: IGetPokemonListParams = {
      page: 1,
      limit: 20,
    };
    const mockRepo = {
      getList: vi.fn().mockResolvedValue(mockList),
      getById: vi.fn(),
      getEvolutionChain: vi.fn(),
    };
    const useCase = new GetPokemonListUseCase(mockRepo);
    const result = await useCase.execute(params);

    expect(mockRepo.getList).toHaveBeenCalledWith(params);
    expect(result).toEqual(mockList);
  });

  it("repassa corretamente page, limit, search e types", async () => {
    const params: IGetPokemonListParams = {
      page: 2,
      limit: 10,
      search: "pika",
      types: ["electric"],
    };
    const mockRepo = {
      getList: vi.fn().mockResolvedValue(mockList),
      getById: vi.fn(),
      getEvolutionChain: vi.fn(),
    };
    const useCase = new GetPokemonListUseCase(mockRepo);
    await useCase.execute(params);

    expect(mockRepo.getList).toHaveBeenCalledWith({
      page: 2,
      limit: 10,
      search: "pika",
      types: ["electric"],
    });
  });
});
