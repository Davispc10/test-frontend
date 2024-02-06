import { CharactersRepository } from '../repository/characters-repository'

type Input = {
  id: string
  hash: string
  ts: number
}

export class FindCharacterByIdUseCase {
  constructor(private readonly charactersRepository: CharactersRepository) {}

  async execute({ id, hash, ts }: Input) {
    const character = await this.charactersRepository.findById({ id, hash, ts })

    return character
  }
}
