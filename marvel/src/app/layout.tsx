import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Favicon from '@/assets/imgs/favicon.png'
import './globals.css'
import { Header } from '@/components/layout'

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
      <body className={poppins.className}>
        <Header />
        <div className="pt-12">{children}</div>
      </body>
    </html>
  )
}
