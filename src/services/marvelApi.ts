import axios, { AxiosError } from 'axios'

import { Dispatch, SetStateAction } from 'react'

import { pageSize, baseUrl, pubKey } from '@/services/constants'

import { getHash, getTimestamp } from '@/helpers/hashGenerator'

import { Character, Comic } from '@/interfaces/interfaces'
import { CharactersApiResponse, ComicsApiResponse } from '@/interfaces/apiResponses'

const ts = getTimestamp()
const hash = getHash(ts)

const marvelApi = axios.create({
	baseURL: baseUrl,
	params: {
		ts: ts,
		apikey: pubKey,
		hash: hash,
	},
})

export const getNumberOfPages = (charactersNumber: number, pageSize: number): number => {
	return Math.floor(charactersNumber / pageSize) + 1
}

export async function getCharactersTotal(characterName: string = ''): Promise<number> {
	try {
		if (characterName === '') {
			const response = await marvelApi.get<CharactersApiResponse>('characters', {
				params: {
					ts: ts,
					apikey: pubKey,
					hash: hash,
					limit: pageSize,
					offset: 0,
				},
			})
			return response.data.data.total
		} else {
			const response = await marvelApi.get<CharactersApiResponse>('characters', {
				params: {
					ts: ts,
					apikey: pubKey,
					hash: hash,
					limit: pageSize,
					offset: 0,
					nameStartsWith: characterName,
				},
			})
			return response.data.data.total
		}
	} catch (err) {
		const { error } = (err as AxiosError<any, any>)?.response?.data
		throw new Error(error)
	}
}

export async function getPaginatedCharacters(
	page: number,
	characterName: string = ''
): Promise<Character[]> {
	try {
		const params: Record<string, any> = {
			limit: pageSize,
			offset: (page - 1) * pageSize,
		}

		if (characterName) {
			params.nameStartsWith = characterName
		}

		const { data } = await marvelApi.get<CharactersApiResponse>('characters', {
			params,
		})

		return data.data.results
	} catch (err) {
		const { error } = (err as AxiosError<any, any>)?.response?.data
		throw new Error(error)
	}
}

export async function getCharactersById(characterId: string): Promise<Character[]> {
	try {
		const { data } = await marvelApi.get<CharactersApiResponse>(`characters/${characterId}`, {
			params: {
				ts: ts,
				apikey: pubKey,
				hash: hash,
			},
		})
		return data.data.results
	} catch (err) {
		const { error } = (err as AxiosError<any, any>)?.response?.data
		throw new Error(error)
	}
}

export const getCharactersByNameAxios = async (
	characterName: string
): Promise<Character[]> => {
	try {
		const { data } = await marvelApi.get<CharactersApiResponse>(`characters`, {
			params: {
				ts: ts,
				apikey: pubKey,
				hash: hash,
				nameStartsWith: characterName,
				limit: pageSize,
			},
		})
		return data.data.results
	} catch (err) {
		const { error } = (err as AxiosError<any, any>)?.response?.data
		throw new Error(error)
	}
}

export async function getComicsByCharacterId(characterId: string): Promise<Comic[]> {
	const { data } = await marvelApi.get<ComicsApiResponse>(`characters/${characterId}/comics`, {
		params: {
			ts: ts,
			apikey: pubKey,
			hash: hash,
		},
	})

	return data.data.results
}
