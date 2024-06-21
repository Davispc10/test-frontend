import { Button } from '@/components/ui'
import { PersonageContext } from '@/contexts/personageContext'
import { useContext } from 'react'
import { usePaginationButtons } from './usePaginationButtons'

interface PaginationPersonagesProps {
  pages: number
}

export function PaginationPersonages({ pages }: PaginationPersonagesProps) {
  const { changePage, currentPage } = useContext(PersonageContext)
  const { endButton, startButton } = usePaginationButtons({
    currentPage,
  })

  if (pages <= 1) return <></>

  return (
    <div className="flex gap-2 items-center justify-center">
      <Button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
        notActive={currentPage === 1}
        className="hidden sm:flex"
      >
        Back
      </Button>

      {Array.from({ length: pages }, (_, index) => (
        <Button
          notActive={currentPage !== index}
          key={index}
          onClick={() => changePage(index)}
          className="w-10"
        >
          {index}
        </Button>
      )).slice(startButton, endButton)}
      <Button
        onClick={() => changePage(currentPage + 1)}
        disabled={pages - 1 === currentPage}
        notActive={pages - 1 === currentPage}
        className="hidden sm:flex"
      >
        Next
      </Button>
    </div>
  )
}
