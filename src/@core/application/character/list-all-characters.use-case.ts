import {
  CharacterAdapter,
  CharacterAdapterFindAllParams,
  CharacterOrderBy,
} from "@core/domain/adapters/character.adapter";
import { Character } from "@core/domain/entities/character";
import { UseCase } from "@core/domain/use-case";

export type ListAllCharactersUseCaseParams = {
  max?: number;
  offset?: number;
  orderBy?: CharacterOrderBy;
};

export type ListAllCharacterUseCaseReturn = {
  characters: Character[];
  available: number;
  returned: number;
};

export class ListAllCharactersUseCase
  implements
    UseCase<ListAllCharactersUseCaseParams, ListAllCharacterUseCaseReturn>
{
  constructor(private characterAdapter: CharacterAdapter) {}

  async execute(
    { max, offset, orderBy }: ListAllCharactersUseCaseParams = {
      max: undefined,
      offset: 0,
      orderBy: "name",
    }
  ) {
    const limit = 100;

    const withMax = Number.isInteger(max) ?? false;

    const firstRequest = await this.characterAdapter.findAll({
      limit: withMax ? (max > limit ? limit : max) : limit,
      offset,
      orderBy,
    });

    if (withMax && firstRequest.returned >= max) return firstRequest;

    const countRequests = Math.round(
      Math.min(firstRequest.available - firstRequest.returned, max ?? 2e16) /
        limit
    );

    const requests: CharacterAdapterFindAllParams[] = [];

    for (let i = 0, c = firstRequest.returned; i < countRequests; i++) {
      if (withMax && c >= max) break;

      const lt = withMax ? (c + limit >= max ? max - c : limit) : limit;

      requests.push({ limit: lt, offset: c, orderBy });

      c += lt;
    }

    const responses = await Promise.all(
      requests.map((p, idx) =>
        this.characterAdapter
          .findAll(p)
          .then((res) => ({ ...res, idx: idx + 1 }))
      )
    ).then((r) => {
      r.push({ ...firstRequest, idx: 0 });
      return r.sort((a, b) => a.idx - b.idx);
    });

    const data = responses.reduce((a, c) => ({
      available: c.available,
      characters: [...a.characters, ...c.characters],
      returned: a.returned + c.returned,
      idx: 0,
    }));

    return {
      available: data.available,
      characters: data.characters,
      returned: data.returned,
    };
  }
}
