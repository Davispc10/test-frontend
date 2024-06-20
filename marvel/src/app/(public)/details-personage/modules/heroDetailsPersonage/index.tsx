import { PersonageProps } from '@/components/types'

export function HeroDetailsPersonage({
  personage,
}: {
  personage: PersonageProps
}) {
  return (
    <div className="flex flex-col mt-4 rounded bg-white p-2 shadow-sm md:flex-row gap-2">
      <div className="w-full md:max-w-[400px] bg-primary-400 rounded flex items-center justify-center">
        <img
          className="max-h-60 object-contain "
          src={personage.thumbnail.path}
          alt={`thumbnail ${personage.name}`}
        />
      </div>
      <div>
        <h1 className="text-xl font-semibold mb-2">{personage.name}</h1>
        <p>{personage.description}</p>
      </div>
    </div>
  )
}
