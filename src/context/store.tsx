'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

import { pageSize } from '@/services/constants'
import { Character } from '@/interfaces/interfaces'
import { ContextProps } from '@/context/interfaces'
import { calculateNumOfPages, fetchCharacters } from '@/context/actions'

const GlobalContext = createContext<ContextProps>({
	characters: [],
	setCharacters: (): Character[] | [] => [],
	searchTerm: '',
	setSearchTerm: (): string => '',
	currentPage: 1,
	setCurrentPage: (): number => 1,
	pagesNumber: 1,
	setNumberOfPages: (): number => 1,
	numberOfCharacters: 1,
	setNumberOfCharacters: (): number => 1,
	currentOffset: 0,
	setCurrentOffset: (): number => 0,
})

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
	const [characters, setCharacters] = useState<Character[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [loading, setLoading] = useState(true)
	const [pagesNumber, setNumberOfPages] = useState(1)
	const [numberOfCharacters, setNumberOfCharacters] = useState(1)
	const [currentPage, setCurrentPage] = useState(1)
	const [currentOffset, setCurrentOffset] = useState(0)

	useEffect(() => {
		if (searchTerm === '') {
			fetchCharacters({ currentPage, setterFn: setCharacters })
		}
	}, [currentPage, searchTerm, pagesNumber])

	useEffect(() => {
		calculateNumOfPages({ searchTerm, pageSize, setterFn: setNumberOfPages })
	}, [characters])

	return (
		<GlobalContext.Provider
			value={{
				characters,
				setCharacters,
				searchTerm,
				setSearchTerm,
				currentPage,
				setCurrentPage,
				pagesNumber,
				setNumberOfPages,
				numberOfCharacters,
				setNumberOfCharacters,
				currentOffset,
				setCurrentOffset,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export const useGlobalContext = () => useContext(GlobalContext)
