export type GetProps = {
  url: string
}

export interface HttpRepository {
  get<T>({ url }: GetProps): Promise<T>
}
