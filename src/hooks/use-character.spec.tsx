import React from "react";
import { setTimeout } from "timers/promises";
import { waitFor, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCharacters } from "./use-characters";
import { mockCharactersList } from "@mocks/characters-list.mock";
import { ListCharacterUseCaseReturn } from "@core/application/character/list-characters.use-case";

// Mock use case
jest.mock("@core/application/character/list-characters.use-case", () => ({
  ListCharactersUseCase: class {
    private execute = jest.fn().mockImplementationOnce(async (args) => {
      await setTimeout(1000); // 1 second
      return {
        characters: mockCharactersList(),
        returned: 0,
        available: 0,
      } as ListCharacterUseCaseReturn;
    });
  },
}));

const createWrapper = () => {
  const wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  return wrapper;
};

beforeAll(() => {
  jest.clearAllMocks();
  // (ListCharactersUseCase as jest.Mock<ListCharactersUseCase>).mockClear();
});

describe("UseCharacterHook", () => {
  test("should list characters with use case search", async () => {
    // Renderiza o hook
    const { result } = renderHook(
      () =>
        useCharacters({
          search: { limit: 20, offset: 0, orderBy: "name" },
        }),
      {
        wrapper: createWrapper(),
      }
    );

    // Descreve o resultado esperado
    await waitFor(
      () => {
        // É um array
        expect(result.current.characters).toBeInstanceOf(Array);

        // Possui mais de 0 characters
        expect(result.current.characters.length).toBeGreaterThan(0);

        // Não deu nenhum erro
        expect(result.current.error).toBeNull();

        // Não está carregando
        expect(result.current.isLoading).toBe(false);
      },
      { timeout: 3000, interval: 100 }
    );
  });

  test("should list characters instantilly with initial data", async () => {
    // Renderiza o hook
    const { result } = renderHook(
      () =>
        useCharacters({
          search: { limit: 20, offset: 0, orderBy: "name" },
          initialData: mockCharactersList(),
        }),
      {
        wrapper: createWrapper(),
      }
    );

    // É um array
    expect(result.current.characters).toBeInstanceOf(Array);

    // Possui mais de 0 characters
    expect(result.current.characters.length).toBeGreaterThan(0);

    // Não deu nenhum erro
    expect(result.current.error).toBeNull();

    // Não está carregando
    expect(result.current.isLoading).toBe(false);
  });
});
