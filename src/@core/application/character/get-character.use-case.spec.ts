import { CharacterAdapter } from "@core/domain/adapters/character.adapter";
import { mockCharacter as mockCharacterFn } from "@mocks/character.mock";
import { GetCharacterUseCase } from "./get-character.use-case";

describe("GetCharacterUseCase", () => {
  it("should return a character", async () => {
    const mockCharacter = mockCharacterFn();
    const characterAdapter: CharacterAdapter = {
      findAll: jest.fn(),
      findById: jest.fn().mockImplementation(async () => {
        return mockCharacter;
      }),
      findComicsById: jest.fn(),
    };

    const getCharacterUseCase = new GetCharacterUseCase(characterAdapter);

    const character = await getCharacterUseCase.execute(mockCharacter.id);

    // Verifica se o character foi modificado no escopo do use case.
    expect(character).toEqual(mockCharacter);

    // Verifica se o método findById foi chamado uma vez.
    expect(characterAdapter.findById).toHaveBeenCalledTimes(1);

    // Verifica se o método findAll não foi chamado.
    expect(characterAdapter.findAll).not.toHaveBeenCalled();

    // Verifica se o método findComicsById não foi chamado.
    expect(characterAdapter.findComicsById).not.toHaveBeenCalled();
  });
});

export {};
