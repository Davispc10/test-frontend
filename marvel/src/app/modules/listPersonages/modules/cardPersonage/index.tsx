import { PersonageProps } from '@/components/types'
import { Button } from '@/components/ui'

export function CardPersonage({ personage }: { personage: PersonageProps }) {
  return (
    <li className="bg-white p-2 rounded shadow-sm h-full flex flex-col">
      <img
        src={personage.thumbnail.path}
        alt={`thumbnail ${personage.name}`}
        className="mb-2 rounded w-full h-full max-h-[250px] object-cover"
      />
      <h1 className="mb-2 font-semibold">{personage.name}</h1>
      <div className="flex-1 mb-4">
        <p className="text-ellipsis line-clamp-3 text-sm">
          {personage.description}
        </p>
      </div>
      <Button>More details</Button>
    </li>
  )
}
