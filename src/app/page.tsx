'use client'

import Character from "@/components/character"
import { useGetCharactersQuery } from '../store/services/marvel'
import { params } from '@/helpers'
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setCharacters } from "@/store/reducers/marvel"

type dataMarvelProps = {
  id: number
  name: string
  thumbnail: {
    path: string
    extension: string
  }
}

export default function Home() {
  const dispatch = useAppDispatch()
  const characters = useAppSelector(({ marvel }) => marvel.characters)
  const { data, error, isLoading } = useGetCharactersQuery({ params })

  useEffect(() => {
    if (!isLoading) {
      dispatch(setCharacters(data))
    }
  }, [isLoading, dispatch, data])

  return (
    <main className={`container ${isLoading ? 'showLoader' : ''}`}>
      {error ? (
        <div className="">Oh no, there was an error</div>
      ) : isLoading ? (
        <div className="loader" />
      ) : data ? (
        characters?.results?.map(({ id, name, thumbnail, ...props }: dataMarvelProps) => (
          <Character
            key={id}
            name={name}
            thumbnail={`${thumbnail.path}.${thumbnail.extension}`}
            {...props}
          />
        ))
      ) : null
    }
    </main>
  )
}
