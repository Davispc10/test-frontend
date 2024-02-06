import { ComicsRepository } from '../repository/comics.repository'

type Input = {
  hash: string
  ts: number
  id: string
}

export class FindAllComicsByCharacterIdUseCase {
  constructor(private readonly comicsRepository: ComicsRepository) {}

  async execute({ hash, ts, id }: Input) {
    const comics = await this.comicsRepository.findAll({ hash, ts, id })
    return comics
  }
}
