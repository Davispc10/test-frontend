'use client'

import { useEffect } from "react"
import { usePagination, Pagination } from 'pagination-react-js'

import LayoutDefault from '@/components/layouts/default'
import Character from "@/components/character"
import { useGetCharactersQuery } from '../store/services/marvel'
import { params } from '@/helpers'
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setCharacters } from "@/store/reducers/marvel"

import { CharacterProps } from '@/components/character'

type dataMarvelProps = {
  id: number
  name: string
  thumbnail: {
    path: string
    extension: string
  }
}
type CharacterPageProps = CharacterProps & {
  id: number
  thumbnail: {
    path: string
    extension: string
  }
}

export default function Home() {
  const dispatch = useAppDispatch()
  const characters = useAppSelector(({ marvel }) => marvel.characters)
  const { data, error, isLoading } = useGetCharactersQuery({ params })
  const { currentPage, entriesPerPage, entries } = usePagination(1, 25)

  useEffect(() => {
    if (!isLoading) {
      dispatch(setCharacters(data))
    }
  }, [isLoading, dispatch, data])

  return (
    <LayoutDefault>
      <main className={`layoutDefault ${isLoading ? 'showLoader' : ''}`}>
        {error ? (
          <div className="">Oh no, there was an error</div>
        ) : isLoading ? (
          <div className="loader" />
        ) : data ? (
          <div className="container">
            {characters?.results?.slice(entries.indexOfFirst, entries.indexOfLast)
              .map(({ id, name, thumbnail, ...props }: CharacterPageProps) => (
                <Character
                  key={id}
                  name={name}
                  thumbnail={`${thumbnail.path}.${thumbnail.extension}`}
                  {...props}
                />
            ))}

            <div className="pagination-container">
              <Pagination
                entriesPerPage={entriesPerPage.get}
                totalEntries={100}
                currentPage={{ get: currentPage.get, set: currentPage.set }}
                offset={3}
                classNames={{
                  wrapper: "pagination m-auto",
                  item: "pagination-item",
                  itemActive: "pagination-item-active",
                  navPrev: "pagination-item nav-item nav-prev",
                  navNext: "pagination-item nav-item nav-next",
                  navStart: "pagination-item nav-item",
                  navEnd: "pagination-item nav-item",
                  navPrevCustom: "pagination-item",
                  navNextCustom: "pagination-item"
                }}
                showFirstNumberAlways={true}
                showLastNumberAlways={true}
                navStart="&#171;"
                navEnd="&#187;"
                navPrev="&#x2039;"
                navNext="&#x203a;"
                navPrevCustom={{ steps: 5, content: "\u00B7\u00B7\u00B7" }}
                navNextCustom={{ steps: 5, content: "\u00B7\u00B7\u00B7" }}
              />
            </div>
          </div>
        ) : null
      }
      </main>
    </LayoutDefault>
  )
}
