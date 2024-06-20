import { PersonageProps } from '@/components/types'

export function HeroDetailsPersonage({
  personage,
}: {
  personage: PersonageProps
}) {
  return (
    <div className="flex flex-col mt-4 rounded bg-white p-2 shadow-sm md:flex-row gap-2">
      <img
        className="w-full max-h-60 object-cover md:max-w-[400px]"
        src={personage.thumbnail.path}
        alt={`thumbnail ${personage.name}`}
      />
      <div>
        <h1 className="text-xl font-semibold mb-2">{personage.name}</h1>
        <p>{personage.description}</p>
      </div>
    </div>
  )
}
