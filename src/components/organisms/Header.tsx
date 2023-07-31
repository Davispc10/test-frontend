import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Atom } from '../atoms'
import { ArrowLeft, MagnifyingGlass } from '@phosphor-icons/react'
import { useCharactersStore } from '@/store/characters'

interface IHeader {
  isDetail?: boolean
  comeBack?: () => void
}

export function Header({ isDetail, comeBack }: IHeader) {
  const [bg, setBg] = useState(false)
  const { query, setQuery } = useCharactersStore()

  useEffect(() => {
    window.addEventListener('scroll', () => {
      return window.scrollY > 50 ? setBg(true) : setBg(false)
    })
  })

  return (
    <header
      className={`${
        bg ? ' max-h-20 bg-zinc-950/80 lg:backdrop-blur-lg' : 'bg-zinc-950'
      } fixed z-10 flex h-24 w-full flex-col py-1`}
    >
      <div className="mx-auto flex h-full  w-full max-w-7xl items-center justify-between gap-3 px-2">
        <Link href="/" rel="stylesheet preload prefetch">
          <Image
            className={`${
              bg ? 'max-w-[90%]' : 'max-w-full'
            } transition-all duration-300`}
            src={'/marvel-logo.jpg'}
            alt="logotipo da Marvel"
            width={150}
            height={100}
            quality={100}
            priority
          />
        </Link>
        <div>
          {isDetail ? (
            <Atom.Button
              type="button"
              icon={<ArrowLeft size={20} weight="bold" />}
              onClick={comeBack}
              text="Voltar"
            />
          ) : (
            <Atom.Input
              type="search"
              icon={<MagnifyingGlass size={28} weight="duotone" />}
              placeholder="Pesquisar"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
        </div>
      </div>
    </header>
  )
}
