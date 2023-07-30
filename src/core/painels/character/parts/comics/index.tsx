"use client"

import React, { useState, useEffect } from 'react'
import { BarLoader } from 'react-spinners'
import { BiSolidRightArrow, BiSolidLeftArrow, } from "react-icons/bi"
import { ScrollingCarousel, Carousel } from '@trendyol-js/react-carousel';

import CardCommic from '@/cards/comic'
import MarvelHelper from '@/helpers/MarvelHelper';

import { Main, LoaderStyle, TextHelp } from '../styles'

interface ICharacterComicsPainel {
  id: number
}

export default function CharacterComicsPainel({ id }: ICharacterComicsPainel) {

  const [characterComics, setCharacterComics] = useState<MarvelComic[]>([])
  const [load, setLoad] = useState<boolean>(true)

  async function getData() {
    setLoad(true)

    const dataResponse = new MarvelHelper();
    const response = await dataResponse.getComicsOfCharacterById(Number(id));
    const result = response.data.results

    setCharacterComics(result)
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
        {!characterComics || characterComics.length == 0 && <TextHelp>
          <span>No Comics Founded</span>
        </TextHelp>}
        <ScrollingCarousel className='carousel' leftIcon={<BiSolidLeftArrow />} rightIcon={<BiSolidRightArrow />} >
          {characterComics.map(item => {
            return <CardCommic key={item.id} data={item} />
          })}
        </ScrollingCarousel>
        {/* <Carousel className='carousel' swiping={true} slide={1} show={1} leftIcon={<BiSolidLeftArrow />} rightIcon={<BiSolidRightArrow />} >
          {characterComics.map(item => {
            return <CardCommic key={item.id} data={item} />
          })}
        </Carousel> */}
      </Main>
    </>
  )
}
