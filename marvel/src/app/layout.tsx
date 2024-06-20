import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Favicon from '@/assets/imgs/favicon.png'
import './globals.css'
import { Header } from '@/components/layout'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/services/queryClient'
import { PersonageProvider } from '@/contexts/personageContext'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '500', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Marvel',
  description: 'Explore Marvel Characters',
  icons: [
    {
      rel: 'icon',
      url: Favicon.src,
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} flex flex-col bg-gray-100`}>
        <QueryClientProvider client={queryClient}>
          <PersonageProvider>
            <Header />
            <div className="pt-12 flex-1 flex flex-col">{children}</div>
          </PersonageProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
