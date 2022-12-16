import { CharacterAdapter } from "@core/domain/adapters/character.adapter";
import { mockCharactersList } from "@mocks/characters-list.mock";
import { ListAllCharactersUseCase } from "./list-all-characters.use-case";

describe("ListAllCharactersUseCase", () => {
  it("should return a list all characters", async () => {
    const charactersCount = 1000;
    const mockCharacters = mockCharactersList(charactersCount);
    const characterAdapter: CharacterAdapter = {
      findAll: jest.fn().mockImplementation(async ({ limit, offset }) => {
        const characters = mockCharacters.slice(offset, offset + limit);
        return {
          characters,
          available: mockCharacters.length,
          returned: characters.length,
        };
      }),
      findById: jest.fn(),
      findComicsById: jest.fn(),
    };

    const listCharacterUseCase = new ListAllCharactersUseCase(characterAdapter);

    const { characters, available, returned } =
      await listCharacterUseCase.execute();

    // Verifica se o valor de available foi modificado no escopo do use case.
    expect(available).toEqual(mockCharacters.length);

    // Verifica se o valor de returned foi modificado no escopo do use case.
    expect(returned).toEqual(mockCharacters.length);

    // Verifica se o array characters foi modificado no escopo do use case.
    expect(characters).toEqual(mockCharacters);

    // Verifica se o método findAll foi x vezes
    expect(characterAdapter.findAll).toHaveBeenCalledTimes(
      Math.round(charactersCount / 100)
    );

    // Verifica se o método findById não foi chamado.
    expect(characterAdapter.findById).not.toHaveBeenCalled();

    // Verifica se o método findComicsById não foi chamado.
    expect(characterAdapter.findComicsById).not.toHaveBeenCalled();
  });

  it("should return a list all characters with max limit", async () => {
    const charactersCount = 1000;
    const returnedMax = 120;
    const mockCharacters = mockCharactersList(charactersCount);
    const characterAdapter: CharacterAdapter = {
      findAll: jest.fn().mockImplementation(async ({ limit, offset }) => {
        const characters = mockCharacters.slice(offset, offset + limit);
        return {
          characters,
          available: mockCharacters.length,
          returned: characters.length,
        };
      }),
      findById: jest.fn(),
      findComicsById: jest.fn(),
    };

    const listCharacterUseCase = new ListAllCharactersUseCase(characterAdapter);

    const { characters, available, returned } =
      await listCharacterUseCase.execute({
        max: returnedMax,
        offset: 0,
        orderBy: "name",
      });

    // Verifica se o valor de available foi modificado no escopo do use case.
    expect(available).toEqual(mockCharacters.length);

    // Verifica se o valor de returned foi modificado no escopo do use case.
    expect(returned).toEqual(returnedMax);

    // Verifica se o array characters foi modificado no escopo do use case.
    expect(characters).toEqual(mockCharacters.splice(0, returnedMax));

    // Verifica se o método findAll foi 2 vezes
    expect(characterAdapter.findAll).toHaveBeenCalledTimes(2);

    // Verifica se o método findById não foi chamado.
    expect(characterAdapter.findById).not.toHaveBeenCalled();

    // Verifica se o método findComicsById não foi chamado.
    expect(characterAdapter.findComicsById).not.toHaveBeenCalled();
  });
});

export {};
