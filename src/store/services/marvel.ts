/* eslint-disable react-hooks/rules-of-hooks */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import md5 from 'md5'
import { setCharacters } from '../reducers/marvel'
import { useAppDispatch } from '../hooks'

const ts = new Date().getTime()
const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY
const hash = md5(`${ts.toString()}${privateKey}${publicKey}`)

export const marvelApi = createApi({
  reducerPath: 'marvelApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://gateway.marvel.com/v1/public/' }),
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: ({ params }) => ({
        url: `characters?ts=${ts}&hash=${hash}&apikey=${publicKey}`,
        method: 'GET',
        params,
      }),
      transformResponse: ({ data }) => data
    }),
    getCharacterByName: builder.query({
      query: ({ params }) => ({
        url: `characters?ts=${ts}&hash=${hash}&apikey=${publicKey}`,
        method: 'GET',
        params,
      }),
      transformResponse: ({ data }) => data
    }),
  }),
})

export const {
  useGetCharactersQuery,
  useLazyGetCharacterByNameQuery,
} = marvelApi
