 //@ts-nocheck
import { useQueries, useQuery, UseQueryResult } from "@tanstack/react-query"
import { useCallback, useEffect, useMemo } from "react"
import { Character } from "../models/Character"
import { Comic } from "../models/Comic"
import { CharacterRepository } from "../repository/CharacterRepository"
import { ComicRepository } from "../repository/ComicRepository"

export type ApiCharactersResponse = {
    total: number,
    results: Character[]
}
const characterRepo =  new CharacterRepository()

const queryOptions = {
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
}

export function useFetchCharacters(offset: number, name: string): UseQueryResult<ApiCharactersResponse, unknown> {

    const transformData = useCallback((requestData: any) => {
        const characters: Character[] = requestData.data.results
            .map((character: any) => Character.toDomain(character))
        return {...requestData.data, results: characters}
    },[])

    const getByName = useCallback(async () => await characterRepo.getByNameStartWith(offset, name), [offset, name])
    const getByOffset = useCallback(async () => await characterRepo.getByOffset(offset), [offset])
    
    return useQuery<ApiCharactersResponse>(
        [offset,  !name.length ? 'characters' : name],
        !name.length ? getByOffset : getByName, 
        {
            select: transformData,
            ...queryOptions
        })
    
}

export const useFetchCharacter = (id: string | number) => {
    return useQuery(['character', id], async () => await characterRepo.getOne(id), {
        select: (response) => {
            return Character.toDomain(response.data.results[0])
        },
       ...queryOptions
    })
}

export const useGetComicsWithImages = (character?: Character) => {
    const repo = useMemo(() => new ComicRepository(), [])
    
    return useQueries({
        queries: character?.comics.map((comic) => {

            const transformData = (response) => {
                const data = response.data.results[0]
                const imageUrl = data.thumbnail.path + '.' + data.thumbnail.extension
                const newComic = new Comic(comic.name, comic.url, imageUrl)
                if(newComic.isValid()) {
                    return newComic
                }
            }
            
            return {    
                queryKey: ['comic', comic.url],
                queryFn: async () => await repo.getComicsImageUrl(comic.url),
                select: transformData,
                ...queryOptions
            }
        }),
    })
}