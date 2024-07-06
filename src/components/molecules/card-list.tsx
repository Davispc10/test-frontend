'use client'

import { useQuery } from "@tanstack/react-query";
import { Card } from "./card";
import { characterService } from "@/services";

export function CardList() {
  const { data: characters, isLoading: isLoadingCharacters } = useQuery({
    queryKey: ['characters'],
    queryFn: () => characterService.getAllCharacters(),
  })

  if (isLoadingCharacters) return null

  console.log(characters);
  

  return (
    <ul className='grid grid-cols-3 gap-8 relative'>
      {characters?.results?.map((character) => (
        <Card
          id={character.id}
          name={character.name}
          description={character.description}
          thumbnail={{ path: character.thumbnail.path, extension: character.thumbnail.extension }}
        />
      ))}
    </ul>
  )
}