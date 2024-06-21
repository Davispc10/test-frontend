import { ResponseComicsProps } from '@/components/types'
import { api } from '@/services/api'

export async function getComics({
  id,
}: {
  id: string
}): Promise<ResponseComicsProps> {
  const response = await api(`/characters/${id}/comics`, { method: 'GET' })
  const responseJSON = await response.json()
  return responseJSON.data
}
