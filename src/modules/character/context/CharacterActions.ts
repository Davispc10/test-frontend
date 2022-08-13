import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useEffect } from "react"
import { Character } from "../models/Character"
import { CharacterRepository } from "../repository/CharacterRepository"
import { useCharacter } from "./CharacterContext"

export type ApiInfo = {
    offset: number,
    limit: number,
    total: number,
    count: number,
    results: Character[]
}

export function useFetchCharacters(offset: number): UseQueryResult<ApiInfo, unknown> {
    const repo = new CharacterRepository()
    const { setCharacters} = useCharacter()
    
    const transformData = (requestData: any) => {
        const characters: Character[] = requestData.data.results.map((character: any) => Character.toDomain(character))
        return {...requestData.data, results: characters}
    }

    const response =  useQuery<ApiInfo>(["characters", offset], async () => await repo.getByOffset(offset), {
        select: transformData,
        keepPreviousData: true,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      })
    
    useEffect(() => {
        setCharacters(response.data?.results || [])
    }, [response.isRefetching, setCharacters])

    return response
 
}
