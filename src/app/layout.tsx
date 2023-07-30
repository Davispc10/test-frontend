import { Header } from '@/layout/Header/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Marvel',
  description: 'Listagem marvel'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`mx-auto max-w-7xl bg-gray-900 ${inter.className}`}>
        <Header />
        <main className="py-3">{children}</main>
      </body>
    </html>
  )
}
