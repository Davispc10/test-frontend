import { FindAllComicsByCharacterIdUseCase } from '@/domain/comics/application/use-cases/find-all-comics-by-character-id.use-case'

import { FindAllComicsByCharacterIdDTO } from './dto/find-all-comics-by-character-id.dto'

export class ComicsController {
  constructor(private readonly findAllComicsByCharacterId: FindAllComicsByCharacterIdUseCase) {}

  async findAllByCharacterId({ hash, id, ts }: FindAllComicsByCharacterIdDTO) {
    return await this.findAllComicsByCharacterId.execute({ hash, ts, id })
  }
}
