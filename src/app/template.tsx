/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import React, { useEffect } from "react"
import { useFormik } from 'formik'
import { params } from '@/helpers'
import { useLazyGetCharacterByNameQuery } from "@/store/services/marvel"
import {  setCharacters } from "@/store/reducers/marvel"
import { useAppDispatch } from "@/store/hooks"

export default function Template({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const [getCharacter, { data = { results: [] }, isFetching }] = useLazyGetCharacterByNameQuery()

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: ({ search }) => {
      const p = {
        ...params,
        name: search.toLowerCase(),
      }

      getCharacter({ params: p })
    }
  })

  useEffect(() => {
    if (isFetching && data?.results.length > 0) {
      dispatch(setCharacters(data))
    }
  }, [data, dispatch, isFetching])

  return (
    <>
      <header className="header">
        <form onSubmit={handleSubmit}>
          <label htmlFor="search">
            <input
              className="search"
              type="text"
              id="search"
              name="search"
              placeholder="Enter name your character"
              onChange={handleChange}
              required
              value={values.search}
            />
          </label>
        </form>
      </header>

      {children}
    </>
  )
}
