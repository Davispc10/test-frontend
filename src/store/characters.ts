import { create } from 'zustand'

interface ICharactersStore {
  query?: string
  page?: number
}

export const useCharactersStore = create<ICharactersStore>()((set) => ({
  query: undefined,
  page: 1,
  setQuery: (value?: string) => set(() => ({ query: value })),
  setPage: (value?: number) => set(() => ({ page: value })),
}))
