'use client'

import { Container } from '@/components/ui'
import { useDetailsPersonage } from '../useDetailsPersonage'
import {
  Error,
  HeroDetailsPersonage,
  ListComics,
  SkeletonDetailsPersonage,
} from '../modules'

export default function DetailsPersonage({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const { isError, isLoading, personage, comics } = useDetailsPersonage({
    id: slug,
  })

  if (isLoading) return <SkeletonDetailsPersonage />

  if (isError || !personage || !comics) return <Error />

  return (
    <Container>
      <HeroDetailsPersonage personage={personage} />
      <ListComics comics={comics} />
    </Container>
  )
}
