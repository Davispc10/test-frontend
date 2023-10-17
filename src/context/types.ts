import { Dispatch, SetStateAction } from 'react'

import { Character } from '@/interfaces/interfaces'

export type fetchCharactersType = {
	currentPage: number
	setterFn: Dispatch<SetStateAction<Character[] | []>>
}

export type calculateNumOfPagesType = {
	searchTerm: string
	pageSize: number
	setterFn: Dispatch<SetStateAction<number>>
}
