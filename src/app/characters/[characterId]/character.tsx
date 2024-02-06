import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

import { findCharacter } from '@/app/actions/find-character'
import { query } from '@/lib/query'

type Props = {
  characterId: string
}

export const Character = async ({ characterId }: Props) => {
  const handle = query(findCharacter)
  const character = await handle({ characterId }, [characterId])

  return (
    <div>
      <Avatar className="mx-auto h-36 w-36 md:h-80 md:w-80">
        <AvatarImage src={character.thumbnail.path} width={200} height={200} alt={character.name} />
        <AvatarFallback className="text-3xl md:text-7xl">{character.name.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className="space-y-3">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{character.name}</h1>
        <p>{character.description}</p>
      </div>
    </div>
  )
}

export const CharacterSkeleton = () => {
  return (
    <div>
      <Skeleton className="mx-auto h-36 w-36 rounded-full md:h-80 md:w-80" />
      <div className="space-y-3">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          <Skeleton className="h-14 w-1/5" />
        </h1>
        <p>
          <Skeleton className="h-4 w-full" />
        </p>
      </div>
    </div>
  )
}
