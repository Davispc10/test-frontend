import * as React from 'react'
import { twMerge } from 'tailwind-merge'


export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return <input type={type}
    className={
      twMerge('py-2 px-4 rounded-sm bg-dark-700 focus:outline-none focus:ring-2 focus:ring-zinc-800', className)
    }
    ref={ref}
    {...props} />
})

Input.displayName = 'Input'

export { Input }