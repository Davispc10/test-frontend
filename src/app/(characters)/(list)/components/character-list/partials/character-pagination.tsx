import { useEffect, useRef } from 'react'

import { PAGE_QUERY_PARAM } from '@/app/(characters)/constants'
import {
  Pagination,
  PaginationList,
  PaginationNext,
  PaginationPrevious,
  usePagination,
} from '@/components/ui/pagination'
import { useSetQueryStringState } from '@/hooks/use-set-query-string-state'

type CharactersPaginationProps = {
  pageSize: number
  total: number
  page: number
}

export const CharactersPagination = ({
  pageSize,
  total,
  page,
}: CharactersPaginationProps) => {
  const setQueryStringState = useSetQueryStringState()

  const pagination = usePagination({
    id: 'characters-pagination',
    page,
    count: total,
    pageSize,
    onChange: ({ page }) => {
      setQueryStringState({ [PAGE_QUERY_PARAM]: page.toString() })
    },
  })

  const stableSetCount = useRef(pagination.setCount).current
  const stableSetPage = useRef(pagination.setPage).current

  useEffect(() => {
    stableSetCount(total)
  }, [stableSetCount, total])

  useEffect(() => {
    stableSetPage(page)
  }, [page, stableSetPage])

  useEffect(() => {
    if (page > pagination.totalPages) {
      setQueryStringState({ [PAGE_QUERY_PARAM]: '1' })
    }
  }, [page, pagination.totalPages, setQueryStringState])

  return (
    <Pagination api={pagination}>
      <PaginationPrevious showLabel />
      <div className="hidden gap-1 sm:inline-flex">
        <PaginationList />
      </div>
      <PaginationNext showLabel />
    </Pagination>
  )
}
