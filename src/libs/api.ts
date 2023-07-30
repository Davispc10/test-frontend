import axios from 'axios'
import md5 from 'crypto-js/md5'

export const api = axios.create({
  baseURL: 'https://gateway.marvel.com:443/v1/public',
  params: {
    apikey: process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY
  }
})

api.interceptors.request.use((config) => {
  const timestamp = new Date().getTime()
  const hash = md5(
    `${timestamp}${process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY}${process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY}`
  )

  config.params = {
    ...config.params,
    hash,
    ts: timestamp
  }
  return config
})

api.interceptors.response.use((response) => {
  return response.data
})
