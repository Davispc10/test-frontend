import { CharactersRepository } from '../repository/characters-repository'

type Input = {
  id: string
}

export class FindCharacterByIdUseCase {
  constructor(private readonly charactersRepository: CharactersRepository) {}

  async execute({ id }: Input) {
    const character = await this.charactersRepository.findById({ id })

    return character
  }
}
