import { GetProps, HttpRepository } from './http.repository'

export class HttpService implements HttpRepository {
  async get<T>({ url }: GetProps): Promise<T> {
    const response = await fetch(url).then((response) => response.json())

    return response
  }
}
