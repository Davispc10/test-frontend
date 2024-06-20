import { ResponsePersonageProps } from '@/components/types'
import { api } from '@/services/api'

export async function getPersonages({
  offset,
  name,
}: {
  offset: number
  name?: string
}): Promise<ResponsePersonageProps> {
  const nameParam = name ? `nameStartsWith=${name}&` : ''

  const response = await api(
    '/characters',
    { method: 'GET' },
    `${nameParam}offset=${offset}`,
  )
  const responseJSON = await response.json()
  return responseJSON.data as ResponsePersonageProps
}
