import { Atom } from '../atoms'

interface IInfoPage {
  title: string
  countCharacters: number
}

export function InfoPage({ title, countCharacters }: IInfoPage) {
  return (
    <div className="flex items-center justify-between py-8">
      <h1 className="font-accent text-3xl lg:text-5xl">{title}</h1>
      {countCharacters > 0 ? (
        <Atom.Counter quantityCharacters={countCharacters} />
      ) : null}
    </div>
  )
}
