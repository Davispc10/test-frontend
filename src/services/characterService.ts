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

export async function getAllCharacters() {
  const { data } = await httpClient.get<CharacterResponse>('/characters', {
    params: {
      limit: 10,
      offset: 0,
    } 
  })
  return data.data
}