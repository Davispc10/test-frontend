import { Comics } from '@/types/character';
import { Character } from "./character"

export interface CharactersResponse {
  data:
  {
    results: Character[]

  }
}

export interface ComicsResponse {
  data:
  {
    results: Comics[]

  }
}

