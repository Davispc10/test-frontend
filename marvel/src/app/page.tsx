import { Container } from '@/components/ui'
import { HeroHome, ListPersonages, PaginationPersonages } from './modules'

export default function Home() {
  return (
    <main className=" flex-1">
      <HeroHome />
      <Container>
        <PaginationPersonages />
        <ListPersonages />
      </Container>
    </main>
  )
}
