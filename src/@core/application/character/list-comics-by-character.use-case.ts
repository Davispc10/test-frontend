import { CharacterAdapter } from "@core/domain/adapters/character.adapter";
import { ComicOrderBy } from "@core/domain/adapters/comic.adapter";
import { Comic } from "@core/domain/entities/comic";
import { UseCase } from "@core/domain/use-case";

export type ListComicsByCharacterUseCaseParams = {
  characterId: number;
  limit?: number;
  offset?: number;
  orderBy?: ComicOrderBy;
};

export type ListComicsByCharacterUseCaseReturn = {
  comics: Comic[];
  available: number;
  returned: number;
};

export class ListComicsByCharacterUseCase
  implements
    UseCase<
      ListComicsByCharacterUseCaseParams,
      ListComicsByCharacterUseCaseReturn
    >
{
  constructor(private characterAdapter: CharacterAdapter) {}

  execute(
    {
      limit,
      offset,
      orderBy,
      characterId,
    }: ListComicsByCharacterUseCaseParams = {
      limit: 20,
      offset: 0,
      orderBy: "title",
      characterId: undefined,
    }
  ) {
    if (!characterId) throw new Error("CharacterId is required!");

    return this.characterAdapter.findComicsById(characterId, {
      limit,
      offset,
      orderBy,
    });
  }
}
