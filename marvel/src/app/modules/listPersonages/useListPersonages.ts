import { getPersonages } from '@/functions'
import { validateImage } from '@/utils'
import { useQuery } from '@tanstack/react-query'

export function useListPersonages() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['personages'],
    queryFn: getPersonages,
  })

  const validateData = data?.results?.map((personage) => ({
    ...personage,
    description: personage.description || 'uninformed description',
    thumbnail: validateImage(personage.thumbnail),
  }))

  return { data: validateData, isLoading, isError }
}
