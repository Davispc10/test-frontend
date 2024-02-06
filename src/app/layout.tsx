import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'

import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Search } from '@/components/search'
import { ScrollArea } from '@/components/ui/scroll-area'

import { Providers } from '@/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dinheirow',
  description: 'Template for Dinheirow',
}

type Props = Readonly<{
  children: React.ReactNode
}>

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          <ScrollArea className="h-full w-full">
            <Suspense>
              <Search />
            </Suspense>
            <main>
              <Container>{children}</Container>
            </main>
            <Footer />
          </ScrollArea>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
