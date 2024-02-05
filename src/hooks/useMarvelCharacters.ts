import { useQuery } from 'react-query'

import { CharactersProps } from '@/@types/characters'

type useMarvelCharactersProps = {
  url: string
}

export const useMarvelCharacters = ({ url }: useMarvelCharactersProps) => {
  const fetchCharacters = async () => {
    const response = await fetch(url)

    const tratedResults: CharactersProps = await response.json()
    return tratedResults
  }

  return useQuery('characters', fetchCharacters)
}
