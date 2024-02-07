import { cn } from '@/lib/utils'

type ContainerProps = React.HTMLAttributes<HTMLDivElement>

export const Container = ({ className, children, ...props }: ContainerProps) => {
  return (
    <div className={cn('mx-auto max-w-7xl px-3 py-6 sm:px-6 lg:px-8', className)} {...props}>
      <div className="m-auto max-w-2xl lg:max-w-none">{children}</div>
    </div>
  )
}
