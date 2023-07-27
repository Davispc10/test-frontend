'use client'

import { useEffect, useRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import {
  Pagination,
  PaginationList,
  PaginationNext,
  PaginationPrevious,
  usePagination,
} from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { useSetQueryStringState } from '@/hooks/use-set-query-string-state'
import { cn, getThumbnailAsString } from '@/utils'

import { useGetCharactersQuery } from '../api/get-characters'
import {
  ORDER_BY_DEFAULT_VALUE,
  ORDER_BY_SEARCH_PARAM,
  PAGE_QUERY_PARAM,
  SEARCH_QUERY_PARAM,
} from '../constants'
import { type Character, type OrderBy } from '../schemas'

export const CharacterList = () => {
  const searchParams = useSearchParams()

  const orderBy = (searchParams.get(ORDER_BY_SEARCH_PARAM) ??
    ORDER_BY_DEFAULT_VALUE) as OrderBy

  const search = searchParams.get(SEARCH_QUERY_PARAM) ?? ''
  const searchParamsPage = searchParams.get(PAGE_QUERY_PARAM)
  const page = searchParamsPage ? Number(searchParamsPage) : 1

  const { status, data } = useGetCharactersQuery({
    page,
    orderBy,
    search,
  })

  if (status === 'loading') {
    return <CharacterListSkeleton />
  }

  if (status === 'error') {
    return <div>Error</div>
  }

  if (data.total === 0) {
    return (
      <p className="text-center text-xl">
        Desculpa, não encontramos nenhum personagem com o nome{' '}
        <strong>&quot;{search}&quot;</strong>
      </p>
    )
  }

  return (
    <div className="my-10 space-y-10">
      <CharacterListContainer>
        {data.results.map((character) => (
          <CharacterCard
            key={character.id}
            id={character.id}
            name={character.name}
            thumbnail={character.thumbnail}
          />
        ))}
      </CharacterListContainer>

      <div className="flex w-full items-center justify-end sm:justify-center">
        <CharactersPagination
          pageSize={data.limit}
          total={data.total}
          page={page}
        />
      </div>
    </div>
  )
}

type CharacterListContainerProps = {
  children: React.ReactNode
}

const CharacterListContainer = ({ children }: CharacterListContainerProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(146px,1fr))] gap-4 xs:grid-cols-[repeat(auto-fill,minmax(190px,1fr))]">
      {children}
    </div>
  )
}

type CharacterCardProps = Pick<Character, 'id' | 'name' | 'thumbnail'>

const CharacterCard = ({ id, name, thumbnail }: CharacterCardProps) => {
  return (
    <div className="group relative max-w-full transition-colors">
      <Link className="no-underline" href={`/characters/${id}`}>
        <div className="overflow-hidden">
          <figure className="relative h-52 overflow-hidden after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-[#e62429]">
            <Image
              className="block h-full w-full scale-100 overflow-hidden object-cover object-[top_center] transition-all ease-linear group-hover:scale-105"
              src={getThumbnailAsString(thumbnail)}
              alt={name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              priority
            />
          </figure>
        </div>

        <div
          className={cn(
            'relative z-30 h-36 overflow-hidden bg-[#151515] p-4 transition-colors duration-300',
            'before:absolute before:bottom-full before:left-0 before:-z-[1] before:h-full before:w-full before:transform before:bg-[#e62429] before:transition-transform before:duration-300 before:group-hover:translate-y-full',
            'after:absolute after:bottom-0 after:right-0 after:z-40 after:border-r-[12px] after:border-t-[12px] after:border-r-white after:border-t-transparent',
          )}
        >
          <p className="text-sm font-semibold uppercase tracking-[1px] text-white">
            {name}
          </p>
        </div>
      </Link>
    </div>
  )
}

type CharactersPaginationProps = {
  pageSize: number
  total: number
  page: number
}

const CharactersPagination = ({
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

  useEffect(() => {
    stableSetCount(total)
  }, [stableSetCount, total])

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

const CharacterListSkeleton = () => {
  return (
    <div className="my-10">
      <CharacterListContainer>
        {Array.from({ length: 20 }).map((_, index) => (
          <Skeleton key={index} className="h-[352px] w-full rounded" />
        ))}
      </CharacterListContainer>
    </div>
  )
}
