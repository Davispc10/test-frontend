import { client } from './client'

export const query = <T, D>(actions: (data: D) => T) => {
  const handle = async (data: D, queryKey: Array<string>) => {
    return await client.fetchQuery({
      queryKey,
      queryFn: () => actions(data),
      staleTime: 10000,
    })
  }

  return handle
}
