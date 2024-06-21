'use client'

import { ListPersonageProps, ResponsePersonageProps } from '@/components/types'
import { getPersonages } from '@/functions'
import { validateImage } from '@/utils'
import { QueryObserverResult, useQuery } from '@tanstack/react-query'
import {
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react'

interface PersonageContextProps {
  nameValue: string
  currentPage: number
  personages: ListPersonageProps
  isLoadingPersonages: boolean
  isErrorPersonages: boolean
  dataPersonages: ResponsePersonageProps | undefined
  isActiveFilterName: boolean

  setNameValue: Dispatch<SetStateAction<string>>
  setCurrentPage: Dispatch<SetStateAction<number>>
  refetchPersonages: () => Promise<
    QueryObserverResult<ResponsePersonageProps, Error>
  >
  handleSubmitSearchNamePersonage: (
    e: FormEvent<HTMLFormElement>,
  ) => Promise<void>
  changePage: (page: number) => Promise<void>
  clearFilters: () => void
}

export const PersonageContext = createContext({} as PersonageContextProps)

export function PersonageProvider({ children }: { children: ReactNode }) {
  const [nameValue, setNameValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isActiveFilterName, setIsActiveFilterName] = useState(false)
  const [shouldRefetch, setShouldRefetch] = useState(false)

  const {
    data: dataPersonages,
    isLoading: isLoadingPersonages,
    isError: isErrorPersonages,
    refetch: refetchPersonages,
  } = useQuery({
    queryKey: ['personages', currentPage, isActiveFilterName],
    queryFn: () =>
      getPersonages({ offset: (currentPage - 1) * 20, name: nameValue }),
  })

  useEffect(() => {
    if (shouldRefetch) {
      refetchPersonages()
      setShouldRefetch(false)
    }
  }, [shouldRefetch, refetchPersonages])

  async function changePage(page: number) {
    setCurrentPage(page)
    if (!isActiveFilterName) {
      await refetchPersonages()
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmitSearchNamePersonage(
    e: FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault()
    if (nameValue === '') return
    setCurrentPage(1)
    setIsActiveFilterName(true)
    setShouldRefetch(true)
  }

  function clearFilters() {
    setNameValue('')
    setCurrentPage(1)
    setIsActiveFilterName(false)
    setShouldRefetch(true)
  }

  const personages =
    dataPersonages?.results?.map((personage) => ({
      ...personage,
      description: personage.description || 'uninformed description',
      thumbnail: validateImage(personage.thumbnail),
    })) || []

  return (
    <PersonageContext.Provider
      value={{
        nameValue,
        currentPage,
        personages,
        dataPersonages,
        isLoadingPersonages,
        isErrorPersonages,
        isActiveFilterName,
        refetchPersonages,
        setNameValue,
        setCurrentPage,
        handleSubmitSearchNamePersonage,
        changePage,
        clearFilters,
      }}
    >
      {children}
    </PersonageContext.Provider>
  )
}
