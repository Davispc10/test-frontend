import { Character, Comic } from '@/interfaces/interfaces'

interface ApiResponse<T> {
	code: number
	status: string
	data: {
		offset: number
		limit: number
		total: number
		count: number
		results: T[]
	}
}

export interface CharactersApiResponse extends ApiResponse<Character> {}

export interface ComicsApiResponse extends ApiResponse<Comic> {}

