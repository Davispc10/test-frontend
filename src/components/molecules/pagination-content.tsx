import { ChevronsLeft, ChevronsRight } from "lucide-react";

import { Button } from "../atoms/button";


export const PAGE_SIZE = 10

type PaginationContentProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PaginationContent({ currentPage, totalPages, onPageChange }: PaginationContentProps) {
  const pages = Math.ceil(totalPages / PAGE_SIZE) || 1

  return (
    <div className="flex items-center justify-end mt-8 gap-4">
      <span className="text-sm">
        Total pages: {pages}
      </span>

      <div className="flex items-center gap-4">
        <div className="text-sm">
          Page {currentPage} of {pages}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
          >
            <ChevronsLeft />
            Previous Page
          </Button>
          <Button
            onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
          >
            Next Page
            <ChevronsRight />
          </Button>
        </div>
      </div>

    </div>
  )
}