import { CharacterAdapter } from "@core/domain/adapters/character.adapter";
import { Character } from "@core/domain/entities/character";
import { UseCase } from "@core/domain/use-case";

export class ListCharactersUseCase implements UseCase<void, Character[]> {
  constructor(private characterAdapter: CharacterAdapter) {}

  execute() {
    return this.characterAdapter.findAll();
  }
}
