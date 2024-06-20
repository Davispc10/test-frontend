import { PersonageProps } from '@/components/types'
import { getPersonage } from '@/functions'
import { getComics } from '@/functions/personages/getComics'
import { validateImage } from '@/utils'
import { useQueries } from '@tanstack/react-query'

export function useDetailsPersonage({ id }: { id: string }) {
  const [
    {
      data: dataPersonage,
      isError: isErrorPersonage,
      isLoading: isLoadingPersonage,
    },
    { data: dataComic, isError: isErrorComics, isLoading: isLoadingComics },
  ] = useQueries({
    queries: [
      {
        queryKey: ['personage'],
        queryFn: () => getPersonage({ id }),
        staleTime: 0,
      },
      {
        queryKey: ['comics'],
        queryFn: () => getComics({ id }),
        staleTime: 0,
      },
    ],
  })

  const response = dataPersonage?.results[0]

  const personage: PersonageProps | null = response
    ? {
        ...response,
        description: response?.description || 'uninformed description',
        thumbnail: validateImage(response.thumbnail),
      }
    : null

  const comics = dataComic?.results.map((comic) => ({
    ...comic,
    thumbnail: validateImage(comic.thumbnail),
  }))

  return {
    comics,
    personage,
    isLoading: isLoadingComics || isLoadingPersonage,
    isError: isErrorComics || isErrorPersonage,
  }
}
