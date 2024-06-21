import { api } from '@/services/api'
import { getComics } from '.'
import { ResponseComicsProps } from '@/components/types'

jest.mock('@/services/api')
describe('getComics()', () => {
  it('should fetch and return comics data', async () => {
    const mockedResponse: ResponseComicsProps = {
      count: 0,
      limit: 0,
      offset: 0,
      total: 0,
      results: [
        {
          id: 0,
          description: '',
          thumbnail: {
            extension: '',
            path: '',
          },
          title: '',
        },
      ],
    }
    ;(api as jest.Mock).mockResolvedValueOnce({
      json: async () => mockedResponse,
    })

    const id = '1011498'
    const response = await getComics({ id })

    expect(api).toHaveBeenCalledWith(`/characters/${id}/comics`, {
      method: 'GET',
    })
    expect(response).not.toEqual(mockedResponse)
  })
})
