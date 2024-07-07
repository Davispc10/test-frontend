import { PAGE_SIZE } from "@/components/molecules/pagination-content";
import { httpClient } from "@/lib/httpClient";

type Character = {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: "jpg" | "png"
  }
}

type CharacterResponse = {
  data: {
    offset: number
    limit: number
    total: number
    count: number
    results: Character[]
  }
}

type CharacterParams = {
  name: string | null
  limit: number
  offset: number
}

export async function getAllCharacters({limit, offset, name}: CharacterParams) {
  const { data } = await httpClient.get<CharacterResponse>('/characters', {
    params: {
      limit,
      offset,
      nameStartsWith: name
    } 
  })
  return data.data
}