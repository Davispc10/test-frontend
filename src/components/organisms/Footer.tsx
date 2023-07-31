import { Copyright } from '@phosphor-icons/react'
import { Molecule } from '../molecules'

export function Footer() {
  return (
    <footer className="h-full bg-zinc-950 px-4 py-4">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 lg:grid-cols-2">
        <h2 className="text-center text-4xl lg:text-start">Marvel-App</h2>
        <Molecule.SocialLinkGroup />
      </div>
      <div className="mt-4 flex flex-col items-start justify-center gap-1 p-4 lg:items-center">
        <p className="font-display text-[12px] ">
          Data provided by
          <a
            href="https://www.marvel.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accentLight rounded-lg px-1 py-1 hover:bg-black"
          >
            Marvel.
          </a>
        </p>
        <p className="mt-[-4px] flex items-center gap-1 font-display text-[12px] text-accent">
          <Copyright size={16} weight="duotone" />
          <span>2023 | MARVEL</span>
        </p>
      </div>
    </footer>
  )
}
