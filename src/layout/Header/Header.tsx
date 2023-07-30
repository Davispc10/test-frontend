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
    <header className="flex items-center px-6" style={{ height: HEADER_SIZE }}>
      <Link href={'/'} className="cursor-pointer">
        <Image src={logo} alt="marvel" className="h-5 w-auto sm:h-8" />
      </Link>
      <nav className="flex flex-1 justify-center">
        <ul className="flex gap-2 text-xs text-white sm:gap-9 sm:text-base md:gap-14 lg:gap-20">
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
