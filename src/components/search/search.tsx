'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'

import { QueryParams } from '@/lib/utils'
import { ArrowLeft, SearchIcon, XIcon } from 'lucide-react'

import { Container } from '../container'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export const Search = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const query = searchParams.get('search')
  const [search, setSearch] = React.useState(query || '')

  const handleSearch = useCallback(
    (value: string) => {
      const url = QueryParams.baseUrl('/').query({ query: 'search', value: value }).value()
      router.push(url)
      setSearch(value)
    },
    [router],
  )

  // caso clique em enter, realiza a busca
  React.useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSearch(search)
      }
    }
    window.addEventListener('keydown', handleEnter)
    return () => window.removeEventListener('keydown', handleEnter)
  }, [search, handleSearch])

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSearch('')
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [handleSearch])

  const isActuallyHome = pathname === '/'

  return (
    <header className="bg-accent-background sticky inset-x-0 top-0 z-10 bg-opacity-50 backdrop-blur-lg backdrop-filter">
      <Container className="max-w-4xl">
        {isActuallyHome && (
          <div className="flex gap-3">
            <div className="relative w-full">
              <Input type="text" name="search" value={search} onChange={(e) => setSearch(e.target.value)} />
              <button
                data-isvisible={!!search}
                className="pointer-events-none invisible absolute right-2 top-1/2 -translate-y-1/2 data-[isvisible=true]:pointer-events-auto data-[isvisible=true]:visible"
                onClick={() => handleSearch('')}
              >
                <XIcon />
              </button>
            </div>
            <Button type="submit" size="icon" onClick={() => handleSearch(search)}>
              <SearchIcon />
            </Button>
          </div>
        )}
        {!isActuallyHome && (
          <div>
            <Button type="button" size="icon" onClick={() => router.back()}>
              <ArrowLeft size={24} />
            </Button>
          </div>
        )}
      </Container>
    </header>
  )
}
