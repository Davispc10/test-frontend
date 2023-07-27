'use client'

import * as pagination from '@zag-js/pagination'
import { normalizeProps, useMachine } from '@zag-js/react'
import Link from 'next/link'

import { Icons } from '@/components/icons'
import { cn, createSafeContext } from '@/utils'

import { buttonVariants } from '../button'

type PaginationContextValue = {
  api: ReturnType<typeof pagination.connect>
}

const [PaginationProvider, usePaginationContext] =
  createSafeContext<PaginationContextValue>(
    'usePaginationContext must be used within a PaginationProvider',
  )

type PaginationProps = {
  children: React.ReactNode
  className?: string
  api: ReturnType<typeof pagination.connect>
}

export const usePagination = (
  props: Omit<pagination.Context, 'translations'>,
) => {
  const [state, send] = useMachine(
    pagination.machine({
      ...props,
      translations: {
        rootLabel: 'Paginação',
        nextPageTriggerLabel: 'Próxima página',
        prevPageTriggerLabel: 'Página anterior',
        pageTriggerLabel: ({ page }) => `Página ${page}`,
      },
    }),
  )

  const api = pagination.connect(state, send, normalizeProps)

  return api
}

export const Pagination = ({ children, className, api }: PaginationProps) => {
  return (
    <PaginationProvider value={{ api }}>
      <nav {...api.rootProps}>
        <ul className={cn('isolate inline-flex gap-1', className)}>
          {children}
        </ul>
      </nav>
    </PaginationProvider>
  )
}

type PaginationActionsProps = {
  className?: string
  showLabel?: boolean
}

export const PaginationPrevious = ({
  className,
  showLabel,
}: PaginationActionsProps) => {
  const { api } = usePaginationContext()

  return (
    <li>
      <Link
        href="#previous"
        className={cn(
          buttonVariants({ variant: 'outline', className }),
          api.isFirstPage && 'pointer-events-none opacity-50',
          className,
        )}
        {...api.prevPageTriggerProps}
      >
        <Icons.ChevronLeft className="h-5 w-5" aria-hidden="true" />
        <span className={cn(!showLabel && 'sr-only')}>Anterior</span>
      </Link>
    </li>
  )
}

export const PaginationNext = ({
  className,
  showLabel,
}: PaginationActionsProps) => {
  const { api } = usePaginationContext()

  return (
    <li>
      <Link
        href="#next"
        className={cn(
          buttonVariants({ variant: 'outline' }),
          api.isLastPage && 'pointer-events-none opacity-50',
          className,
        )}
        {...api.nextPageTriggerProps}
      >
        <span className={cn(!showLabel && 'sr-only')}>Próximo</span>
        <Icons.ChevronRight className="h-5 w-5" aria-hidden="true" />
      </Link>
    </li>
  )
}

type PaginationListProps = {
  pageClassName?: string
  ellipsisClassName?: string
}

export const PaginationList = ({
  pageClassName,
  ellipsisClassName,
}: PaginationListProps) => {
  const { api } = usePaginationContext()

  return (
    <>
      {api.pages.map((page, idx) => {
        if (page.type === 'page') {
          return (
            <li key={page.value}>
              <Link
                href={`#${page.value}`}
                className={cn(
                  buttonVariants({
                    variant: 'outline',
                  }),
                  'data-[selected]:border-primary data-[selected]:bg-primary data-[selected]:text-primary-foreground',
                  pageClassName,
                )}
                {...api.getPageTriggerProps(page)}
              >
                {page.value}
              </Link>
            </li>
          )
        }

        return (
          <li
            key={`ellipsis-${idx}`}
            className={cn(
              buttonVariants({
                variant: 'outline',
              }),
              ellipsisClassName,
            )}
          >
            <span {...api.getEllipsisProps({ index: idx })}>&#8230;</span>
          </li>
        )
      })}
    </>
  )
}
