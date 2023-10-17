import { Character } from '@/interfaces/interfaces'
import { Dispatch, SetStateAction } from 'react'

export interface ContextProps {
	characters: Character[] | []
	setCharacters: Dispatch<SetStateAction<Character[] | []>>
	searchTerm: string
	setSearchTerm: Dispatch<SetStateAction<string>>
	currentPage: number
	setCurrentPage: Dispatch<SetStateAction<number>>
	pagesNumber: number
	setNumberOfPages: Dispatch<SetStateAction<number>>
	numberOfCharacters: number
	setNumberOfCharacters: Dispatch<SetStateAction<number>>
	currentOffset: number
	setCurrentOffset: Dispatch<SetStateAction<number>>
}
