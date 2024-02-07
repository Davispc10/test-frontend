import { FindAllCharactersUseCase } from '@/domain/characters/application/use-cases/find-all-characters.use-case'
import { FindCharacterByIdUseCase } from '@/domain/characters/application/use-cases/find-character-by-id.use-case'

import { CharactersController } from '../controller/characters/characters.controller'
import { CharactersGateway } from '../gateway/characters.gateway'
import { HttpService } from '../http/http.service'

export const charactersFactory = () => {
  const http = new HttpService()

  const gateway = new CharactersGateway(http)

  const findAllUseCase = new FindAllCharactersUseCase(gateway)
  const findById = new FindCharacterByIdUseCase(gateway)

  const controller = new CharactersController(findAllUseCase, findById)

  return controller
}
