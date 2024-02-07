import { CharacterProps, CharactersProps } from '@/@types/characters'
import {
  CharactersRepository,
  FindAllCharactersProps,
  FindCharacterByIdProps,
} from '@/domain/characters/application/repository/characters-repository'
import { CharacterDetailsEntity } from '@/domain/characters/enterprise/characters-details.entity'
import { CharacterEntity } from '@/domain/characters/enterprise/characters.entity'
import { env } from '@/env.mjs'
import { validateCharacter } from '@/utils/validate-character'
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

    const characters = await this.httpRepository.get<CharactersProps>({
      url: `${env.NEXT_PUBLIC_API_URL}/characters?ts=${ts}&limit=${limit}&offset=${page}&apikey=${env.NEXT_PUBLIC_API_PUBLIC_KEY}&hash=${hash}`,
    })

    const charactersMapped = validateCharacters(characters)

    characters.data.results = charactersMapped

    return characters
  }

  async findById({ id, ts, hash }: FindCharacterByIdProps): Promise<CharacterDetailsEntity> {
    const character = await this.httpRepository.get<CharacterDetailsEntity>({
      url: `${env.NEXT_PUBLIC_API_URL}/characters/${id}?ts=${ts}&apikey=${env.NEXT_PUBLIC_API_PUBLIC_KEY}&hash=${hash}`,
    })

    const charactersMapped = validateCharacter(character)

    character.data.results = charactersMapped

    return character
  }
}
