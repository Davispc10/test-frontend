import { ReactNode } from 'react'

export function Grid({ children }: { children: ReactNode }) {
  return (
    <ul className="w-full grid grid-cols-1 gap-4 sm:grid-cols-3 xl:grid-cols-4 py-4">
      {children}
    </ul>
  )
}
