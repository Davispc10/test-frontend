import { MarvelCharacter } from '@/interfaces/marvelAPI'

interface IInfoCharacter {
  character: MarvelCharacter
}
export function InfoCharacter({ character }: IInfoCharacter) {
  const { name, description } = character
  return (
    <div className="px-4 py-4">
      <h1 className="font-accent text-3xl lg:text-5xl">{name}</h1>
      <p className="mt-6 text-lg">{description}</p>
    </div>
  )
}
