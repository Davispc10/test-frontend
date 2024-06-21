import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  notActive?: boolean
}

export function Button({
  notActive = false,
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        `bg-primary-200 rounded px-2 py-1 text-white flex items-center justify-center hover:bg-primary-400/80 ${className}`,
        notActive && 'bg-primary-400/50',
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
