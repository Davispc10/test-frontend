import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type QueryProps = {
  query: string
  value?: string
}

export abstract class QueryParams {
  private static url: string
  private static searchParams: URLSearchParams

  static baseUrl(url: string) {
    this.searchParams = new URLSearchParams(url.split('?')[1])
    this.url = url.split('?')[0]
    return this
  }

  static query({ query, value }: QueryProps) {
    if (query !== undefined && value !== undefined) {
      this.searchParams.set(query, value)
    }
    if (value === undefined || value === '') {
      this.searchParams.delete(query)
    }
    return this
  }

  static value() {
    return `${this.url}?${this.searchParams.toString()}`
  }
}
