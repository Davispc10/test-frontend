import { CharacterType } from "@/types/character";
import { createApiUrl } from "@/utils/apiUrl";
import axios from "axios";

type ResponseType = {
  results: CharacterType[]
  total: number
}

export class CharacterRepository {
  private apiUrl = createApiUrl("characters")

  async getAll() {
    const response = await axios.get(this.apiUrl)
    return { results: response.data.data.results, total: response.data.data.total } as ResponseType
  }
}
