import { CharacterAdapter } from "@core/domain/adapters/character.adapter";
import { mockComicsList } from "@mocks/comics.mock";
import { ListComicsByCharacterUseCase } from "./list-comics-by-character.use-case";

describe("ListComicsByCharacter", () => {
  it("should return a list of comics", async () => {
    const mockComics = mockComicsList();
    const characterAdapter: CharacterAdapter = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findComicsById: jest.fn().mockImplementation(async () => {
        return {
          comics: mockComics,
          available: mockComics.length,
          returned: mockComics.length,
        };
      }),
    };

    const listComicsByCharacterUseCase = new ListComicsByCharacterUseCase(
      characterAdapter
    );

    const { comics, available, returned } =
      await listComicsByCharacterUseCase.execute({ characterId: 1 });

    // Verifica se o array comics foi modificado no escopo do use case.
    expect(comics).toEqual(mockComics);

    // Verifica se o valor de available foi modificado no escopo do use case.
    expect(available).toEqual(comics.length);

    // Verifica se o valor de returned foi modificado no escopo do use case.
    expect(returned).toEqual(comics.length);

    // Verifica se o método findComicsById foi chamado uma vez.
    expect(characterAdapter.findComicsById).toHaveBeenCalledTimes(1);

    // Verifica se o método findById não foi chamado.
    expect(characterAdapter.findById).not.toHaveBeenCalled();

    // Verifica se o método findAll não foi chamado.
    expect(characterAdapter.findAll).not.toHaveBeenCalled();
  });
});

export {};
