export interface HeroProps {
  id: number,
  name: string,
  image: string,
  className: string
}

export interface ResponseHeroProps {
  id: number,
  name: string,
  thumbnail: {
    path: string,
  }
}
