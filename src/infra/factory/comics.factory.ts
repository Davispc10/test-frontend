import { FindAllComicsByCharacterIdUseCase } from '@/domain/comics/application/use-cases/find-all-comics-by-character-id.use-case'

import { ComicsController } from '../controller/comics/comics.controller'
import { ComicsGateway } from '../gateway/comics.gateway'
import { HttpService } from '../http/http.service'

export const comicsFactory = () => {
  const http = new HttpService()

  const gateway = new ComicsGateway(http)

  const findAllUseCase = new FindAllComicsByCharacterIdUseCase(gateway)

  const controller = new ComicsController(findAllUseCase)

  return controller
}
