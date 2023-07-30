import React from 'react'
import CardCredit from '@/cards/credit'
import { Footer } from '../home/styles'

function About() {
  const credits: SiteCredit[] = [
    {
      title: 'Marvel Site',
      explanation: `Site of Marvel which gives the API`,
      externalUrl: 'https://www.marvel.com',
      imgUrl: '/imgs/marvel-site-logo.svg'
    },
  ]

  return (
    <>
      <main className="container mx-auto pt-40 flex-wrap pr-4 pl-4">
        <div className="flex justify-center">
          <h1 className='text-white text-3xl'>About</h1>
        </div>
        <div className='flex flex-row flex-wrap justify-evenly'>
          {credits.map(item => (
            <CardCredit
              key={item.title}
              data={item}
            />
          ))}
        </div>
      </main>
      <Footer> © {new Date().getFullYear()} Marvel App - All rights reserved.</Footer>
    </>
  )
}

export default About