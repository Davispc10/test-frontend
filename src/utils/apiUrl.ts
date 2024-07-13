import md5 from "md5" 

export function createApiUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_MARVEL_API_BASE_URL || ""
  const publicApiKey = process.env.NEXT_PUBLIC_MARVEL_API_PUBLIC_KEY || ""
  const privateApiKey = process.env.NEXT_PUBLIC_MARVEL_API_PRIVATE_KEY || ""
  const ts = "1"
  const hash = md5(ts + privateApiKey + publicApiKey)

  return `${baseUrl}${path}?ts=${ts}&apikey=${publicApiKey}&hash=${hash}`
}
