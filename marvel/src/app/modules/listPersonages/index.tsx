import Link from 'next/link'
import { CardPersonage } from './modules'
import { Grid } from '@/components/ui'
import { ListPersonageProps } from '@/components/types'

export function ListPersonages({ data }: { data: ListPersonageProps }) {
  return (
    <Grid>
      {data?.map((personage) => (
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
