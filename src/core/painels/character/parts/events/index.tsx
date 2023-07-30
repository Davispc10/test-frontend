"use client"

import React, { useState, useEffect } from 'react'
import { BarLoader } from 'react-spinners'
import { BiSolidRightArrow, BiSolidLeftArrow, } from "react-icons/bi"
import { ScrollingCarousel } from '@trendyol-js/react-carousel';

import CardEvents from '@/cards/event'
import MarvelHelper from '@/helpers/MarvelHelper';

import { Main, TextHelp, LoaderStyle } from '../styles'

interface ICharacterEventsPainel {
  id: number
}

export default function CharacterEventsPainel({ id }: ICharacterEventsPainel) {

  const [characterEvents, setCharacterEvents] = useState<MarvelEventData[]>([])
  const [load, setLoad] = useState<boolean>(true)

  async function getData() {
    setLoad(true)

    const dataResponse = new MarvelHelper();
    const response = await dataResponse.getEventOfCharacterById(Number(id));
    const result = response.data.results

    setCharacterEvents(result)
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
        {!characterEvents || characterEvents.length == 0 && <TextHelp>
          <span>No Events Founded</span>
        </TextHelp>}
        <ScrollingCarousel className='carousel' leftIcon={<BiSolidLeftArrow />} rightIcon={<BiSolidRightArrow />} >
          {characterEvents.map(item => {
            return <CardEvents key={item.id} data={item} />
          })}
        </ScrollingCarousel>
      </Main>
    </>
  )
}