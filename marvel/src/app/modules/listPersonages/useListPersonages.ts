import { ThumbnailProps } from '@/components/types'
import { getPersonages } from '@/functions'
import { useQuery } from '@tanstack/react-query'

export function useListPersonages() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['personages'],
    queryFn: getPersonages,
  })

  function validateImage({ extension, path }: ThumbnailProps) {
    if (path.includes('image_not_available')) {
      return {
        path: '/assets/imgs/avatar-not-found.jpeg',
        extension: 'jpeg',
      }
    }

    return {
      path: `${path}.${extension}`,
      extension,
    }
  }

  const validateData = data?.results?.map((personage) => ({
    ...personage,
    description: personage.description || 'uninformed description',
    thumbnail: validateImage(personage.thumbnail),
  }))

  return { data: validateData, isLoading, isError }
}
