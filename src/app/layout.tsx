import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Marvel App',
  description: 'App for marvel characters',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark-900`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
