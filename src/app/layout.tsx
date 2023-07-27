import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/utils/provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Heros of Marvel',
  description: 'A list of Marvel Heros',
}

interface RootLayoutProps {
  children: React.ReactNode;
  pageProps: any;
}

export default function RootLayout({
  children, pageProps
}: RootLayoutProps) {
  return (
    <html lang="en">
      <Providers {...pageProps}>
				<body className={inter.className}>{children}</body>
			</Providers>
    </html>
  )
}
