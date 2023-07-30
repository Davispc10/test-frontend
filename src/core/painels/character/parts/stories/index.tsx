"use client"

import React, { useState, useEffect } from 'react'
import { BarLoader } from 'react-spinners'

import CardStorie from '@/cards/storie'
import MarvelHelper from '@/helpers/MarvelHelper';

import { Main, LoaderStyle, TextHelp } from '../styles'

interface ICharacterComicsPainel {
  id: number
}

export default function CharacterStoriesPainel({ id }: ICharacterComicsPainel) {

  const [characterStories, setCharacterStories] = useState<MarvelComic[]>([])
  const [load, setLoad] = useState<boolean>(true)

  async function getData() {
    setLoad(true)

    const dataResponse = new MarvelHelper();
    const response = await dataResponse.getStoriesOfCharacterById(Number(id));
    const result = response.data.results

    setCharacterStories(result)
    setLoad(false)
  }

  useEffect(() => {
    getData()
  }, [])

  if (load) {
    return (
      <LoaderStyle>
        < BarLoader color='#f00c18' width={200} height={10} />
      </LoaderStyle >
    )
  }

  return (
    <>
      <Main>
        {!characterStories || characterStories.length == 0 && <TextHelp>
          <span>No Stories Founded</span>
        </TextHelp>}

        {characterStories.map(item => {
          return <CardStorie key={item.id} data={item} />
        })}
      </Main>
    </>
  )
}
