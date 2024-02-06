import { CharactersRepository } from '../repository/characters-repository'

type Input = {
  hash: string
  limit: string
  page: string
  ts: number
  search?: string
}

export class FindAllCharactersUseCase {
  constructor(private readonly charactersRepository: CharactersRepository) {}

  async execute({ hash, limit, page, ts, search }: Input) {
    const characters = await this.charactersRepository.findAll({
      hash,
      limit,
      page,
      ts,
      search,
    })

    return characters
  }
}
