import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react'
import { Atom } from '../atoms'

const myProfile = [
  {
    icon: <LinkedinLogo size={32} weight="duotone" />,
    href: 'https://www.linkedin.com/in/waltersasouza',
  },
  {
    icon: <GithubLogo size={32} weight="duotone" />,
    href: 'https://github.com/wsasouza',
  },
]

export function SocialLinkGroup() {
  return (
    <div className="flex justify-center gap-2 lg:justify-end">
      {myProfile.map((item, index) => (
        <Atom.SocialLink key={index} icon={item.icon} href={item.href} />
      ))}
    </div>
  )
}
