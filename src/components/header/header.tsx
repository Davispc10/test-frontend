import Image from 'next/image'
import Link from 'next/link'

import { ThemeToggle } from '../theme-toggle'

export const Header = () => {
  return (
    <div className="border-b border-border">
      <header className="container flex h-16 items-center">
        <div className="flex h-full items-center justify-center border-r border-border pr-4">
          <Link href="/">
            <Image
              src="/marvel.svg"
              alt="Marvel Logo"
              height={50}
              width={120}
              priority
            />
          </Link>
        </div>

        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </header>
    </div>
  )
}
