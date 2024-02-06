import { FindAllCharactersUseCase } from '@/domain/characters/application/use-cases/find-all-characters.use-case'
import { FindCharacterByIdUseCase } from '@/domain/characters/application/use-cases/find-character-by-id.use-case'

import { FindAllCharactersDTO } from './dto/find-all-characters.dto'
import { FindCharacterByIdDTO } from './dto/find-character-by-id.dto'

export class CharactersController {
  constructor(
    private readonly findAllCharactersUseCase: FindAllCharactersUseCase,
    private readonly findCharacterById: FindCharacterByIdUseCase,
  ) {}

  async findAll({ hash, limit, page, ts, search }: FindAllCharactersDTO) {
    return await this.findAllCharactersUseCase.execute({ hash, limit, page, ts, search })
  }

  async findById({ id }: FindCharacterByIdDTO) {
    return await this.findCharacterById.execute({ id })
  }
}
