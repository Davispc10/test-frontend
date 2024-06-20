import { PersonageContext } from '@/contexts/personageContext'
import { useContext } from 'react'

export function useHome() {
  const { personages, dataPersonages, isLoadingPersonages, isErrorPersonages } =
    useContext(PersonageContext)

  const allPersonages = dataPersonages?.total || 0
  const pages = Math.ceil(allPersonages / 20)

  return {
    data: personages,
    isLoading: isLoadingPersonages,
    isError: isErrorPersonages,
    pages,
  }
}
