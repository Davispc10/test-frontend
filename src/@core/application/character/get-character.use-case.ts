import { CharacterAdapter } from "@core/domain/adapters/character.adapter";
import { Character } from "@core/domain/entities/character";
import { UseCase } from "@core/domain/use-case";

export class GetCharacterUseCase implements UseCase<number, Character> {
  constructor(private characterAdapter: CharacterAdapter) {}

  execute(id: number) {
    return this.characterAdapter.findById(id);
  }
}
