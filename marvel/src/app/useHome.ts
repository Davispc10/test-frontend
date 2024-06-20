import { getPersonages } from '@/functions'
import { validateImage } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useHome() {
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['personages', currentPage],
    queryFn: () => getPersonages({ offset: (currentPage - 1) * 20 }),
  })

  const validateData = data?.results?.map((personage) => ({
    ...personage,
    description: personage.description || 'uninformed description',
    thumbnail: validateImage(personage.thumbnail),
  }))

  const allPersonages = data?.total || 0
  const pages = Math.ceil(allPersonages / 20)

  function changePage(page: number) {
    setCurrentPage(page)
    refetch()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return {
    data: validateData,
    isLoading,
    isError,
    pages,
    currentPage,
    changePage,
  }
}
