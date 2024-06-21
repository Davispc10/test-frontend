'use client'

import { Container, ListSkeleton } from '@/components/ui'
import { HeroHome, ListPersonages, PaginationPersonages } from './modules'
import { useHome } from './useHome'

export default function Home() {
  const { data, isLoading, pages } = useHome()

  return (
    <main className="flex-1">
      <HeroHome />
      {isLoading && <ListSkeleton />}
      {!isLoading && data && (
        <Container className="py-4">
          <PaginationPersonages pages={pages} />
          {!isLoading && data.length === 0 && (
            <div className="flex items-center justify-center">
              <p>characters not found</p>
            </div>
          )}
          <ListPersonages data={data} />
          <PaginationPersonages pages={pages} />
        </Container>
      )}
    </main>
  )
}
