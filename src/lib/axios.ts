import axios from 'axios'

export function setupAPIMarvel() {
  const api = axios.create({
    baseURL: 'https://gateway.marvel.com/v1/public/',
  })

  return api
}