import { Container, ListSkeleton } from '@/components/ui'

export function SkeletonDetailsPersonage() {
  return (
    <Container className="mt-4">
      <div className="bg-primary-200 h-64 animate-pulse rounded text-white p-2 flex items-center justify-center" />
      <ListSkeleton />
    </Container>
  )
}
