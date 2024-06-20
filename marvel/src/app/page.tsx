'use client'

import { Container, ListSkeleton } from '@/components/ui'
import { HeroHome, ListPersonages, PaginationPersonages } from './modules'
import { useHome } from './useHome'

export default function Home() {
  const { data, isError, isLoading, pages, changePage, currentPage } = useHome()

  return (
    <main className="flex-1">
      <HeroHome />
      {isLoading && <ListSkeleton />}
      {!isLoading && data && (
        <Container className="py-4">
          <PaginationPersonages
            pages={pages}
            currentPage={currentPage}
            changePage={changePage}
          />
          <ListPersonages data={data} />
          <PaginationPersonages
            pages={pages}
            currentPage={currentPage}
            changePage={changePage}
          />
        </Container>
      )}
    </main>
  )
}
