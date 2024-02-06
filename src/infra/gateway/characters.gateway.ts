import { CharactersProps } from '@/@types/characters'
import { defaultDescription, defaultImage } from '@/consts'
import {
  CharactersRepository,
  FindAllCharactersProps,
  FindCharacterByIdProps,
} from '@/domain/characters/application/repository/characters-repository'
import { CharacterEntity } from '@/domain/characters/enterprise/characters.entity'
import { env } from '@/env.mjs'
import { validateCharacters } from '@/utils/validate-characters'

import { HttpRepository } from '../http/http.repository'

export class CharactersGateway implements CharactersRepository {
  constructor(private readonly httpRepository: HttpRepository) {}

  async findAll({ hash, limit, page, ts, search }: FindAllCharactersProps): Promise<CharacterEntity> {
    if (search) {
      const characters = await this.httpRepository.get<CharactersProps>({
        url: `${env.NEXT_PUBLIC_API_URL}/characters?ts=${ts}&nameStartsWith=${search}&offset=${page}&limit=${limit}&apikey=${env.NEXT_PUBLIC_API_PUBLIC_KEY}&hash=${hash}`,
      })

      const charactersMapped = validateCharacters(characters)

      characters.data.results = charactersMapped

      return characters
    }
    console.log(page)
    // console.log(
    //   `${env.NEXT_PUBLIC_API_URL}/characters?ts=${ts}&limit=${limit}&offset=${page}&apikey=${env.NEXT_PUBLIC_API_PUBLIC_KEY}&hash=${hash}`,
    // )
    const characters = await this.httpRepository.get<CharactersProps>({
      url: `${env.NEXT_PUBLIC_API_URL}/characters?ts=${ts}&limit=${limit}&offset=${page}&apikey=${env.NEXT_PUBLIC_API_PUBLIC_KEY}&hash=${hash}`,
    })

    const charactersMapped = validateCharacters(characters)

    characters.data.results = charactersMapped

    return characters
  }

  async findById({ id }: FindCharacterByIdProps): Promise<CharacterEntity> {
    const character = await this.httpRepository.get<CharacterEntity>({
      url: `${env.NEXT_PUBLIC_API_URL}/characters/${id}`,
    })

    return character
  }
}
