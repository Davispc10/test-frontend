import '@testing-library/jest-dom'
import { render } from '@/lib/custom-render'
import { cleanup, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination'

describe('Pagination - Component', () => {
  afterEach(() => {
    cleanup()
  })
  it('should be able to render pagination', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    )
    const wrapper = screen
    const paginationActualPage = wrapper.getByText(/1/i)
    const paginationPrev = wrapper.getByText(/previous/i)
    const paginationNext = wrapper.getByText(/next/i)
    const paginationEllipsis = wrapper.getByText(/More pages/i)
    expect(paginationActualPage).toBeInTheDocument()
    expect(paginationPrev).toBeInTheDocument()
    expect(paginationNext).toBeInTheDocument()
    expect(paginationEllipsis).toBeInTheDocument()
  })
})
