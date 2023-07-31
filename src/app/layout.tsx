import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import { Header } from '@/components/header'
import { siteConfig } from '@/config/site'
import { cn } from '@/utils'

import { Providers } from './providers'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Marvel Characters',
    default: 'Marvel Characters',
  },
  description: 'A list of Marvel characters.',
  authors: [
    {
      name: 'Gabriel Moraes',
      url: 'https://github.com/gabrielnafuzi',
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [`${siteConfig.url}/og.png`],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.png`],
  },
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
