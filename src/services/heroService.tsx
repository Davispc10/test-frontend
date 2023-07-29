import api from './api'

class HeroService {
  async list(offset?: number, name?: string) {
    try {
      const params: Record<string, any> = {
        limit: 20,
        offset: offset || 0,
      }

      if (name) {
        params.nameStartsWith = name
      }

      return await api.get('v1/public/characters', { params })
    } catch (error) {
      throw new Error('Error fetching heroes data')
    }
  }

  async hero(id: any) {
    try {
      const response = await api.get(`v1/public/characters/${id}`)
      return response.data
    } catch (error) {
      throw new Error('Error fetching hero data')
    }
  }
}

const heroService = new HeroService()
export default heroService
