import { ReactNode } from 'react'

interface ISocialLink {
  icon: ReactNode
  href: string
}

export function SocialLink({ icon, href }: ISocialLink) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-12 w-12 items-center justify-center  rounded-full text-zinc-200 transition-all hover:bg-zinc-900 hover:text-white "
    >
      {icon}
    </a>
  )
}
