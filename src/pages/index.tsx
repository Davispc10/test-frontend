import Head from 'next/head'
import { Inter } from 'next/font/google'
import { HomeContainer } from '@/styles/pages/home'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Assembly of Heroes</title>
        <meta name="description" content="Heroes academy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favconMarvel.png" />
      </Head>
      <HomeContainer>
        opa
      </HomeContainer>
    </>
  )
}
