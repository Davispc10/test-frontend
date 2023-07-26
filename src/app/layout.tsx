import '../assets/styles/globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Providers } from '@/store/provider'
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Marvel App React',
  description: 'Website for show characters of marvel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
