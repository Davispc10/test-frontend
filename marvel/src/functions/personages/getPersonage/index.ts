import { ResponsePersonageProps } from '@/components/types'
import { api } from '@/services/api'

export async function getPersonage({
  id,
}: {
  id: string
}): Promise<ResponsePersonageProps> {
  const response = await api(`/characters/${id}`, { method: 'GET' })
  const responseJSON = await response.json()
  return responseJSON.data
}
