import { ResponsePersonageProps } from '@/components/types'
import { api } from '@/services/api'

export async function getPersonages({
  offset,
}: {
  offset: number
}): Promise<ResponsePersonageProps> {
  const response = await api(
    '/characters',
    { method: 'GET' },
    `offset=${offset}`,
  )
  const responseJSON = await response.json()
  return responseJSON.data as ResponsePersonageProps
}
