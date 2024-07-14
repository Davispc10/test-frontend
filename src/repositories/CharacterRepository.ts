import { ComicType } from "@/types/comic";
import { CharacterType } from "@/types/character";
import { createApiUrl } from "@/utils/apiUrl";
import axios from "axios";

type CharactersResponseType = {
  results: CharacterType[]
  total: number
}

type CharacterComicsResponseType = {
  results: ComicType[]
}

export class CharacterRepository {
  private apiUrl = (path: string) => createApiUrl(path)

  async getAll(offset: number): Promise<CharactersResponseType> {
    const response = await axios.get(this.apiUrl("characters") + `&offset=${offset}`)
    return { results: response.data.data.results, total: response.data.data.total }
  }

  async getById(characterId: string): Promise<CharactersResponseType> {
    const response = await axios.get(this.apiUrl(`characters/${characterId}`))
    console.log("Single Character: ", response.data)
    return { results: response.data.data.results, total: response.data.data.total}
  }

  async getCharacterComics(characterId: string): Promise<CharacterComicsResponseType> {
    const response = await axios.get(this.apiUrl(`characters/${characterId}/comics`))
    return { results: response.data.data.results }
  }
}
