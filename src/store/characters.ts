import { create } from 'zustand'
import { MarvelCharacter } from '@/interfaces/marvelAPI'

interface ICharactersStore {
  query?: string
  characters: MarvelCharacter[]
  page: number
  setQuery: (value?: string) => void
  setPage: (value: number) => void
  setCharacters: (value: MarvelCharacter[]) => void
}

export const useCharactersStore = create<ICharactersStore>()((set) => ({
  query: undefined,
  page: 1,
  characters: [],
  setQuery: (value?: string) => set(() => ({ query: value })),
  setPage: (value: number) => set(() => ({ page: value })),
  setCharacters: (value: MarvelCharacter[]) =>
    set(() => ({ characters: value })),
}))
