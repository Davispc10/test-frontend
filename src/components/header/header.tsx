import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
    <div className="border-b border-border">
      <header className="container flex h-16 items-center px-4">
        <div className="flex h-full items-center justify-center border-r border-border pr-4">
          <Link href="/">
            <Image
              src="/marvel.svg"
              alt="Marvel Logo"
              height={50}
              width={120}
            />
          </Link>
        </div>
      </header>
    </div>
  )
}
