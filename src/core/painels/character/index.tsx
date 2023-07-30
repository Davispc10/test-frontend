"use client"

import Image from 'next/image'
import React from 'react'

import { Main } from './styles'

import CharacterEventsPainel from "@/painels/character/parts/events"
import CharacterComicsPainel from "@/painels/character/parts/comics"
import CharacterSeriesPainel from "@/painels/character/parts/series"
import CharacterStoriesPainel from "@/painels/character/parts/stories"
import { Container } from '@/utils/container'
import { Footer } from '../home/styles'

interface IDate {
  data: MarvelCharacter
}

export default function CharacterPainel({ data }: IDate) {

  const date = data.modified.split("T")
  const dateArr = date[0].split("-")
  const year = dateArr[0]
  const month = dateArr[1]
  const day = dateArr[2]

  return (
    <>
      <Container>
        <Main>
          <section className='bio'>
            <div className='image'>
              <Image
                src={`${data.thumbnail.path.replace(/^http:\/\//i, "https://")}.${data.thumbnail.extension}`}
                alt={`Image of ${data.name}`}
                fill={true}

              />
            </div>
            <div className='name'>
              <h1>{data.name}</h1>
              
            </div>

            <div>
              <h1>{data.description}</h1>
            </div>
            <div className='modified'>
              <p > {year} - {month} - {day}</p>
              
            </div>
          </section>

          <section className='comics'>
            <div className='head'>
              <h2>Comics</h2>
              <div></div>
              <div></div>
              <div></div>
            </div>

            <CharacterComicsPainel id={Number(data.id)} />
          </section>
          <section className='series'>
            <div className='head'>
              <h2>Series</h2>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <CharacterSeriesPainel id={Number(data.id)} />
          </section>
          <section className='events'>
            <div className='head'>
              <h2>Events</h2>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <CharacterEventsPainel id={Number(data.id)} />
          </section>
          <section className='stories'>
            <div className='head'>
              <h2>Stories</h2>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <CharacterStoriesPainel id={Number(data.id)} />
          </section>
        </Main>
        <Footer> © {new Date().getFullYear()} Marvel App - All rights reserved.</Footer>
      </Container>
    </>
  )
}
