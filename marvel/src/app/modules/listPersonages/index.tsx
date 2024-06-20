'use client'

import Link from 'next/link'
import { CardPersonage } from './modules'
import { useListPersonages } from './useListPersonages'
import { Grid, ListSkeleton } from '@/components/ui'

export function ListPersonages() {
  const { data, isError, isLoading } = useListPersonages()

  if (isLoading) return <ListSkeleton />

  if (!data || isError) return <>Erro na busca</>

  return (
    <Grid>
      {data.map((personage) => (
        <Link
          href={`/details-personage/${personage.id}`}
          key={personage.id}
          className="hover:scale-105 transition-all"
        >
          <CardPersonage personage={personage} />
        </Link>
      ))}
    </Grid>
  )
}
