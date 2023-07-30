import Image from 'next/image'
import logo from '@/assets/logo.svg'
import Link from 'next/link'
import { NavItemSchema } from './Header.schema'

const menus: NavItemSchema[] = [
  {
    name: 'Personagens',
    href: '/'
  },
  {
    name: 'Filmes',
    href: '#'
  },
  {
    name: 'Séries',
    href: '#'
  },
  {
    name: 'Quadrinhos',
    href: '#'
  }
]

const HEADER_SIZE = '60px'

export const Header = () => {
  return (
    <header className="flex items-center" style={{ height: HEADER_SIZE }}>
      <Image src={logo} alt="marvel" className="h-8 w-auto" />
      <nav className="flex flex-1 justify-center">
        <ul className="flex gap-20 text-base text-white">
          {menus.map((menu) => (
            <li key={menu.name}>
              <Link href={menu.href}>{menu.name}</Link>
            </li>
          ))}
          <li></li>
        </ul>
      </nav>
    </header>
  )
}
