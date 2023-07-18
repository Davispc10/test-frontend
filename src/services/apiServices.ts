import axios from "axios"
import { 
  BASE_URL, 
  defaultDescription, 
  generateMD5Hash, 
  marvelLogo, 
  privateKey, 
  publicKey } 
from "../utils/utils"

const stringToHash = `1${privateKey}${publicKey}`
const md5Hash = generateMD5Hash(stringToHash)

export const getAllHeroes = async (offset: number, itemsPerPage: number, search?: string) => {
  let url = `${BASE_URL}/characters?offset=${offset}&limit=${itemsPerPage}&ts=1&apikey=${publicKey}&hash=${md5Hash}`
  
  if(search) {
    url += `&nameStartsWith=${search}`
  }

  const response = await axios.get(url)
  return response.data.data
}

export const getOneHero = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/characters/${id}?ts=1&apikey=${publicKey}&hash=${md5Hash}`)
  const image: string = response.data.data.results[0].thumbnail.path

  if (image.includes('not_available')) {
    response.data.data.results[0].thumbnail.path = marvelLogo
  }

  if (response.data.data.results[0].description === '') {
    response.data.data.results[0].description = defaultDescription
  }

  return response.data.data.results[0]
}

