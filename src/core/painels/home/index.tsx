"use client"

import Image from 'next/image'
import React, { useState, useContext } from 'react'
import { NumericFormat } from 'react-number-format'

// import { NumericFormat } from 'react-number-format'
// import PuffLoader from 'react-spinners/PuffLoader'

import MarvelHelper from '@/helpers/MarvelHelper'

import { CharactersContext } from "@/contexts/characters";
import { CharactersProvider } from "@/contexts/characters";

// import crypto from "crypto"
import { useEffect } from 'react';

import CardHeroes from '@/cards/character/index';
import Navigator from '@/utils/navigator';

import { Footer, Imagem, Main } from './styles'
import Paginator from './../../utils/paginator/index';

export default function HomePainel() {

  const { getData, charactersResponse } = useContext(CharactersContext)

  useEffect(() => {
    getData(true)
  }, [])

  return (
    <>
      <Imagem>
        <img src="logo.png" alt="" />
      </Imagem>
      <Main>
        {charactersResponse?.map(item =>
          // <CardHeroes key={item.id} data={item} />
          <CardHeroes data={item} />
        )}
        
      </Main>
      <Paginator />
      <br />
      <br />

      <Footer> © {new Date().getFullYear()} Marvel App - All rights reserved.</Footer>
    </>
  )
}
