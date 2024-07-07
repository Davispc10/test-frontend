import { PaginationContent } from "../molecules/pagination-content";

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ onPageChange, totalPages, currentPage }: PaginationProps) {

  return (
    <PaginationContent currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
  )
}