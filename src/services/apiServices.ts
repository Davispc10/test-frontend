import axios from 'axios'
import {
  BASE_URL,
  defaultDescription,
  generateMD5Hash,
  generateTimestamp,
  marvelLogo,
  privateKey,
  publicKey,
} from '../utils/utils'


const ts = generateTimestamp()
const stringToHash = `${ts + privateKey + publicKey}`
const md5Hash = generateMD5Hash(stringToHash)

export const getAllHeroes = async (
  offset: number,
  itemsPerPage: number,
  search?: string
) => {
  let url = `${BASE_URL}characters?offset=${offset}&limit=${itemsPerPage}&ts=${ts}&apikey=${publicKey}&hash=${md5Hash}`

  if (search) {
    url += `&nameStartsWith=${search}`
  }

  const response = await axios.get(url)
  return response.data.data
}

export const getOneHero = async (id: number) => {
  const response = await axios.get(
    `${BASE_URL}/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${md5Hash}`
  )
  const image: string = response.data.data.results[0].thumbnail.path

  if (image.includes('not_available')) {
    response.data.data.results[0].thumbnail.path = marvelLogo
  }

  if (
    response.data.data.results[0].description === '' ||
    response.data.data.results[0].description === ' '
  ) {
    response.data.data.results[0].description = defaultDescription
  }

  return response.data.data.results[0]
}

export const getHeroComics = async (id: number) => {
  const response = await axios.get(
    `${BASE_URL}/characters/${id}/comics?ts=${ts}&apikey=${publicKey}&hash=${md5Hash}`
  )

  return response.data.data.results
}
