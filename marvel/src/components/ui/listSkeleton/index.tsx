import { Container, Grid } from '@/components/ui'

export function ListSkeleton() {
  const skeletonItems = new Array(8).fill(null)

  return (
    <Container>
      <Grid>
        {skeletonItems.map((_, index) => (
          <li
            key={index}
            className="bg-primary-200 h-64 animate-pulse rounded text-white p-2 flex items-center justify-center"
          >
            <p>loading...</p>
          </li>
        ))}
      </Grid>
    </Container>
  )
}
