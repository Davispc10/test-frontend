import { ComicDTO } from "@/models/comic";
import { CharacterDTO } from "@/models/character";
import { createApiUrl } from "@/utils/apiUrl";
import axios from "axios";

type CharactersResponseType = {
  results: CharacterDTO[]
  total: number
}

type CharacterComicsResponseType = {
  results: ComicDTO[]
}

export class CharacterRepository {
  private apiUrl = (path: string) => createApiUrl(path)

  async getAll(offset: number): Promise<CharactersResponseType> {
    const response = await axios.get(this.apiUrl("characters") + `&offset=${offset}`)
    return { results: response.data.data.results, total: response.data.data.total }
  }

  async getById(characterId: string): Promise<CharactersResponseType> {
    const response = await axios.get(this.apiUrl(`characters/${characterId}`))
    return { results: response.data.data.results, total: response.data.data.total}
  }

  async getComics(characterId: string): Promise<CharacterComicsResponseType> {
    const response = await axios.get(this.apiUrl(`characters/${characterId}/comics`))
    return { results: response.data.data.results }
  }
}
