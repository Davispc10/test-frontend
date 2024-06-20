import { ListComicsProps } from './comicProps'
import { ListPersonageProps } from './personageProps'

interface ResponseProps {
  count: number
  limit: number
  offset: number
  total: number
}

interface ResponsePersonageProps extends ResponseProps {
  results: ListPersonageProps
}

interface ResponseComicsProps extends ResponseProps {
  results: ListComicsProps
}

export type { ResponseComicsProps, ResponsePersonageProps }
