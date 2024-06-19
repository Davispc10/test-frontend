import { ReactNode } from 'react'

interface ContainerProps {
  className?: string
  children: ReactNode
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={` max-w-screen-xl mx-auto px-2 flex-1 h-full ${className}`}>
      {children}
    </div>
  )
}
