import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import { Header } from '@/components/header'
import { cn } from '@/utils'

import { Providers } from './providers'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Marvel Characters',
  description: 'A list of Marvel characters.',
}

type RootLayoutProps = {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Providers>
          <Header />

          {children}
        </Providers>
      </body>
    </html>
  )
}
