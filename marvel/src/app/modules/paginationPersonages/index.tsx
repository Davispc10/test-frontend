import { Button } from '@/components/ui'
import { PersonageContext } from '@/contexts/personageContext'
import { useContext } from 'react'

interface PaginationPersonagesProps {
  pages: number
}

export function PaginationPersonages({ pages }: PaginationPersonagesProps) {
  const { changePage, currentPage } = useContext(PersonageContext)

  const endButton = currentPage <= 5 ? 11 : currentPage + 5
  const startButton = currentPage <= 5 ? 1 : currentPage - 5

  if (pages <= 1) return <></>

  return (
    <div className="flex gap-2 items-center justify-center">
      <Button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
        notActive={currentPage === 1}
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
      >
        Next
      </Button>
    </div>
  )
}
