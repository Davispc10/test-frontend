import { ListPersonageProps } from '@/components/types'
import { api } from '@/services/api'

interface ResponsePersonagesProps {
  count: number
  limit: number
  offset: number
  total: number
  results: ListPersonageProps
}

export async function getPersonages(): Promise<ResponsePersonagesProps> {
  const response = await api('/characters', { method: 'GET' })
  const responseJSON = await response.json()
  return responseJSON.data as ResponsePersonagesProps
}
