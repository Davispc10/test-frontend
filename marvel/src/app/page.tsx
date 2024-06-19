import { Container } from '@/components/ui'
import { HeroHome } from './modules'

export default function Home() {
  return (
    <main className="h-full">
      <HeroHome />
      <Container>Listagem</Container>
    </main>
  )
}
