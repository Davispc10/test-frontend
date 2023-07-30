import { cn } from '@/utils'

import { Icons } from '../icons'

type SpinnerProps = {
  className?: string
}

export const Spinner = ({ className }: SpinnerProps) => {
  return (
    <Icons.Spinner
      className={cn('mr-2 h-4 w-4 animate-spin', className)}
      role="progressbar"
      aria-valuetext="Loading..."
      aria-busy="true"
      aria-live="polite"
    />
  )
}
