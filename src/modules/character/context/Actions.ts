import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Character } from "../models/Character"
import { Comic } from "../models/Comic"
import { CharacterRepository } from "../repository/CharacterRepository"
import { ComicRepository } from "../repository/ComicRepository"
import { useCharacter } from "./CharacterContext"


export type ApiCharactersResponse = {
    total: number,
    results: Character[]
}

export function useFetchCharacters(offset: number): UseQueryResult<ApiCharactersResponse, unknown> {
    const repo = new CharacterRepository()
    const { setCharacters} = useCharacter()
    
    const transformData = (requestData: any) => {
        const characters: Character[] = requestData.data.results.map((character: any) => Character.toDomain(character))
        return {...requestData.data, results: characters}
    }
    
    const response =  useQuery<ApiCharactersResponse>(["characters", offset], async () => await repo.getByOffset(offset), {
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

export const useGetComicsWithImages = (character?: Character) => {
    const repo = new ComicRepository()
    const [comics, setComics] = useState<Comic[]>([])
    const [isLoading, setLoading] = useState(false)
    const [hasError, setError] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        
        if(character?.hasComics()) {
            repo.getComicsImageUrl(character?.comics).then((res) => {
                setComics(res)
            })
            .catch(() => {
                setError(true)
            })
            .finally(() => {
                setLoading(false)
            })
        }
        
    }, [ setComics ])

    return {comics, setComics, isLoading, hasError}
}