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
      <body className={`mx-auto bg-gray-900 lg:max-w-7xl ${inter.className}`}>
        <Header />
        <main className="px-6 py-5">{children}</main>
      </body>
    </html>
  )
}
