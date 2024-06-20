import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  notActive?: boolean
}

export function Button({
  notActive,
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        `bg-primary-200 rounded px-2 py-1 text-white flex items-center justify-center hover:bg-primary-400/60 ${className}`,
        notActive && 'bg-primary-400/20',
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
