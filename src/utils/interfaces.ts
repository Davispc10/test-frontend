export interface HeroProps {
  id: number,
  name: string,
  image: string,
  description?: string,
  thumbnail?: {
    path: string,
  },
  className?: string
}

export interface HeroData {
  total: number,
  results: Array<HeroProps>
}

