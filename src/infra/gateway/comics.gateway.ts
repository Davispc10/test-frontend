import { ComicsRepository, FindAllComicsProps } from '@/domain/comics/application/repository/comics.repository'
import { ComicsEntity } from '@/domain/comics/enterprise/comics.entity'
import { env } from '@/env.mjs'
import { validateComics } from '@/utils/validate-comics'

import { HttpRepository } from '../http/http.repository'

export class ComicsGateway implements ComicsRepository {
  constructor(private readonly httpRepository: HttpRepository) {}

  async findAll({ hash, ts, id }: FindAllComicsProps): Promise<ComicsEntity> {
    const comics = await this.httpRepository.get<ComicsEntity>({
      url: `${env.NEXT_PUBLIC_API_URL}/characters/${id}/comics?ts=${ts}&apikey=${env.NEXT_PUBLIC_API_PUBLIC_KEY}&hash=${hash}`,
    })

    const mappedComics = validateComics(comics)

    comics.data.results = mappedComics

    return comics
  }
}
