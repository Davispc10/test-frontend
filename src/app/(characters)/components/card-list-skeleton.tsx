import { Skeleton } from '@/components/ui/skeleton'

import { CardsGrid } from './cards-grid'

type CharacterListSkeletonProps = {
  amount?: number
}

export const CardListSkeleton = ({
  amount = 20,
}: CharacterListSkeletonProps) => {
  return (
    <div className="my-10">
      <CardsGrid>
        {Array.from({ length: amount }).map((_, index) => (
          <Skeleton key={index} className="h-[352px] w-full rounded" />
        ))}
      </CardsGrid>
    </div>
  )
}
