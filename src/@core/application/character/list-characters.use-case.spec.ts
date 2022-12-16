import { CharacterAdapter } from "@core/domain/adapters/character.adapter";
import { mockCharactersList } from "@mocks/characters-list.mock";
import { ListCharactersUseCase } from "./list-characters.use-case";

describe("ListCharacterUseCase", () => {
  it("should return a list of characters", async () => {
    const mockCharacters = mockCharactersList();
    const characterAdapter: CharacterAdapter = {
      findAll: jest.fn().mockImplementation(async () => {
        return {
          characters: mockCharacters,
          available: mockCharacters.length,
          returned: mockCharacters.length,
        };
      }),
      findById: jest.fn(),
      findComicsById: jest.fn(),
    };

    const listCharacterUseCase = new ListCharactersUseCase(characterAdapter);

    const { characters, available, returned } =
      await listCharacterUseCase.execute();

    // Verifica se o array characters foi modificado no escopo do use case.
    expect(characters).toEqual(mockCharacters);

    // Verifica se o valor de available foi modificado no escopo do use case.
    expect(available).toEqual(mockCharacters.length);

    // Verifica se o valor de returned foi modificado no escopo do use case.
    expect(returned).toEqual(mockCharacters.length);

    // Verifica se o método findAll foi chamado uma vez.
    expect(characterAdapter.findAll).toHaveBeenCalledTimes(1);

    // Verifica se o método findById não foi chamado.
    expect(characterAdapter.findById).not.toHaveBeenCalled();

    // Verifica se o método findComicsById não foi chamado.
    expect(characterAdapter.findComicsById).not.toHaveBeenCalled();
  });
});

export {};
