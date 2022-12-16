import React from "react";
import { setTimeout } from "timers/promises";
import { waitFor, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCharacters } from "./use-characters";
import { mockCharactersList } from "@mocks/characters-list.mock";
import { ListCharacterUseCaseReturn } from "@core/application/character/list-characters.use-case";
import { mockComicsList } from "@mocks/comics.mock";
import { ListComicsByCharacterUseCaseReturn } from "@core/application/character/list-comics-by-character.use-case";
import { useComicsByCharacter } from "./use-comics-by-character";

// Mock use case
jest.mock(
  "@core/application/character/list-comics-by-character.use-case",
  () => ({
    ListComicsByCharacterUseCase: class {
      private execute = jest.fn().mockImplementationOnce(async (args) => {
        await setTimeout(1000); // 1 second
        return {
          comics: mockComicsList(),
          returned: 0,
          available: 0,
        } as ListComicsByCharacterUseCaseReturn;
      });
    },
  })
);

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
});

describe("UseComicsByCharacterHook", () => {
  test("should list comics with use case search", async () => {
    // Renderiza o hook
    const { result } = renderHook(
      () =>
        useComicsByCharacter(1, {
          search: { limit: 20, offset: 0, orderBy: "title" },
        }),
      {
        wrapper: createWrapper(),
      }
    );

    // Descreve o resultado esperado
    await waitFor(
      () => {
        // É um array
        expect(result.current.comics).toBeInstanceOf(Array);

        // Possui mais de 0 comics
        expect(result.current.comics.length).toBeGreaterThan(0);

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
        useComicsByCharacter(1, {
          search: { limit: 20, offset: 0, orderBy: "title" },
          initialData: mockComicsList(),
        }),
      {
        wrapper: createWrapper(),
      }
    );

    // É um array
    expect(result.current.comics).toBeInstanceOf(Array);

    // Possui mais de 0 comics
    expect(result.current.comics.length).toBeGreaterThan(0);

    // Não deu nenhum erro
    expect(result.current.error).toBeNull();

    // Não está carregando
    expect(result.current.isLoading).toBe(false);
  });
});
