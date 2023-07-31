import { quantityCharactersDisplay } from '@/utils'

interface ICounter {
  quantityCharacters: number
}

export function Counter({ quantityCharacters }: ICounter) {
  return (
    <>
      <span className="inline-flex items-center rounded-md bg-zinc-400/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-zinc-400/20 lg:text-lg">
        {quantityCharactersDisplay(quantityCharacters)}
      </span>
    </>
  )
}
