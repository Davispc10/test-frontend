import { ResponsePersonageProps } from '@/components/types'
import { api } from '@/services/api'

export async function getPersonages(): Promise<ResponsePersonageProps> {
  const response = await api('/characters', { method: 'GET' })
  const responseJSON = await response.json()
  return responseJSON.data as ResponsePersonageProps
}
