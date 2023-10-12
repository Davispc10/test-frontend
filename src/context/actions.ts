import {
	getCharactersTotal,
	getPaginatedCharacters,
	getNumberOfPages,
} from '@/services/marvelApi'
import { fetchCharactersType, calculateNumOfPagesType } from '@/context/types'

export const fetchCharacters = async ({ currentPage, setterFn }: fetchCharactersType) => {
	try {
		const characters = await getPaginatedCharacters(currentPage)
		setterFn(characters)
	} catch (error) {
		console.error('Erro ao buscar personagens:', error)
	}
}

export const calculateNumOfPages = async ({
	searchTerm,
	pageSize,
	setterFn,
}: calculateNumOfPagesType) => {
	try {
		const charactersNumber = await getCharactersTotal(searchTerm)
		const pages = getNumberOfPages(charactersNumber, pageSize)
		setterFn(pages)
	} catch (error) {
		console.error('Erro ao buscar personagens:', error)
	}
}

