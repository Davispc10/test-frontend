import React from 'react'
import AboutPainel from '@/painels/about'
import Nav from '@/utils/nav'
import { customMetadata } from '@/utils/meta/index';

export const metadata = customMetadata({})

export default function About() {

  return (
    <>
      <Nav />
      <AboutPainel />
    </>
  )
}
