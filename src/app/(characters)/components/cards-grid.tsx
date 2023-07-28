import { cn } from '@/utils'

type CardsGridProps = {
  children: React.ReactNode
  className?: string
}

export const CardsGrid = ({ children, className }: CardsGridProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-[repeat(auto-fill,minmax(146px,1fr))] gap-4 xs:grid-cols-[repeat(auto-fill,minmax(190px,1fr))]',
        className,
      )}
    >
      {children}
    </div>
  )
}
