import { generateHashMarvel } from '@/utils'

const time = new Date().getTime().toString()

export function api(path: string, init?: RequestInit) {
  const privateKey = process.env.NEXT_PUBLIC_PRIVATE_API_KEY
  const publicKey = process.env.NEXT_PUBLIC_API_KEY
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  const routeUrl = `${baseUrl}/${path}?ts=${time}&apikey=${publicKey}&hash=${generateHashMarvel(
    {
      time,
      privateKey,
      publicKey,
    },
  )}`

  const url = new URL(routeUrl)
  return fetch(url, init)
}
