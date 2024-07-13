import { CharacterType } from "@/types/character";
import { createApiUrl } from "@/utils/apiUrl";
import axios from "axios";

type CharacterResponseType = {
  results: CharacterType[]
  total: number
}

export class CharacterRepository {
  private apiUrl = createApiUrl("characters")

  async getAll(offset: number): Promise<CharacterResponseType> {
    const response = await axios.get(this.apiUrl + `&offset=${offset}`)
    return { results: response.data.data.results, total: response.data.data.total }
  }
}
