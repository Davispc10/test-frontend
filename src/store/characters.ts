import { create } from 'zustand'
import { persist } from 'zustand/middleware'
interface ICharactersStore {
  query?: string
  page: number
  setQuery: (value?: string) => void
  setPage: (value: number) => void
}

export const useCharactersStore = create<ICharactersStore>()(
  persist(
    (set) => ({
      query: undefined,
      page: 1,
      setQuery: (value?: string) => set(() => ({ query: value })),
      setPage: (value: number) => set(() => ({ page: value })),
    }),
    { name: '@marvel-app' },
  ),
)
