import { ThumbnailProps } from './personageProps'

interface ComicProps {
  id: number
  description: string
  thumbnail: ThumbnailProps
  title: string
}

type ListComicsProps = ComicProps[]

export type { ListComicsProps, ComicProps }
