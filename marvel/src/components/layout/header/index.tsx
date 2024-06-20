import { Container } from '@/components/ui'
import { BackPage, Logo } from './modules'

export function Header() {
  return (
    <header className="bg-primary-400 py-2 fixed w-full z-50">
      <Container>
        <div className="flex justify-between items-center">
          <Logo />
          <BackPage />
        </div>
      </Container>
    </header>
  )
}
