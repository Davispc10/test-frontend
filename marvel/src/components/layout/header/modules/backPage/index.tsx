'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function BackPage() {
  const pathName = usePathname()

  if (pathName === '/') return <></>

  return (
    <Link
      href={'/'}
      className="bg-red-600 px-2 py-1 rounded text-white font-semibold hover:bg-red-500"
    >
      Back
    </Link>
  )
}
