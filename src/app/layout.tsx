import { CharacterProvider } from '@/contexts/CharacterProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Marvel | Front-end',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='bg-gray-50 h-screen'>
          <div className='max-w-7xl mx-auto flex justify-center items-center px-4'>
            <div className='w-full h-auto bg-gray-200 py-12 px-12 min-h-[656px] '>
              <CharacterProvider>
                {children}
              </CharacterProvider>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
