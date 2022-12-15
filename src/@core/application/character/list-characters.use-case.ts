import {
  CharacterAdapter,
  CharacterOrderBy,
} from "@core/domain/adapters/character.adapter";
import { Character } from "@core/domain/entities/character";
import { UseCase } from "@core/domain/use-case";

export type ListCharactersUseCaseParams = {
  limit?: number;
  offset?: number;
  orderBy?: CharacterOrderBy;
};

export type ListCharacterUseCaseReturn = Character[];

export class ListCharactersUseCase
  implements UseCase<ListCharactersUseCaseParams, ListCharacterUseCaseReturn>
{
  constructor(private characterAdapter: CharacterAdapter) {}

  execute(
    { limit, offset, orderBy }: ListCharactersUseCaseParams = {
      limit: 20,
      offset: 0,
      orderBy: "name",
    }
  ) {
    return this.characterAdapter.findAll({ limit, offset, orderBy });
  }
}
