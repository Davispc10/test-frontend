'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import React, { ComponentProps } from 'react'

import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

import { QueryParams, cn } from '@/lib/utils'

type PaginationProps = ComponentProps<'div'> & {
  total: number
  limit: number
}

export const Paginations = ({ limit, total, className, ...props }: PaginationProps) => {
  const query = useSearchParams()
  const pathname = usePathname()
  if (total <= limit) return null
  const page = query.get('page') ?? '1'

  const totalPages = Math.ceil(total / limit)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const pageActive = page ? Number(page) : 1
  const pageSliced = pages.slice(pageActive - 2, pageActive + 1)
  const isFirstPage = pageActive === 1
  const isLastPage = pageActive === totalPages

  const handleNextPage = (page: number): string => {
    const url = QueryParams.baseUrl(`${pathname}?${query.toString()}`)

    if ((pageActive === 1 && page === 1) || page === 0 || (pageActive === 2 && page === 1)) {
      return url
        .query({
          query: 'page',
          value: undefined,
        })
        .value()
    }

    if (page > totalPages) {
      return url
        .query({
          query: 'page',
          value: String(totalPages),
        })
        .value()
    }

    url.query({
      query: 'page',
      value: String(page),
    })

    return url.value()
  }

  return (
    <div className={cn('flex justify-end py-10 text-white', className)} {...props}>
      <PaginationRoot>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={handleNextPage(pageActive - 1)} />
          </PaginationItem>

          {totalPages <= 3 &&
            pages.map((page) => {
              const isActive = page === pageActive

              return (
                <PaginationItem key={page}>
                  <PaginationLink isActive={isActive} href={handleNextPage(page)}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

          {totalPages > 3 &&
            pages.map((page, index) => {
              const isActive = page === pageActive

              if (pageActive === 1) {
                if (index < 3) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink isActive={isActive} href={handleNextPage(page)}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                } else if (index === 3) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                }
              }

              // Se a página ativa for a última
              if (pageActive === totalPages) {
                if (index === 0) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                } else if (index > totalPages - 4) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink isActive={isActive} href={handleNextPage(page)}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                }
              }
            })}

          {totalPages > 3 && !isLastPage && !isFirstPage && (
            <React.Fragment>
              {pageSliced[0] !== 1 && (
                <React.Fragment>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                </React.Fragment>
              )}
              {pageSliced.map((page) => {
                const isActive = page === pageActive
                return (
                  <React.Fragment key={page}>
                    <PaginationItem>
                      <PaginationLink isActive={isActive} href={handleNextPage(page)}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  </React.Fragment>
                )
              })}
              {pageSliced[2] !== totalPages && (
                <React.Fragment>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                </React.Fragment>
              )}
            </React.Fragment>
          )}

          <PaginationItem>
            <PaginationNext href={handleNextPage(pageActive + 1)} />
          </PaginationItem>
        </PaginationContent>
      </PaginationRoot>
    </div>
  )
}
