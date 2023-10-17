import type { Metadata } from 'next'
import dotenv from 'dotenv'
import { Inter } from 'next/font/google'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'

import '@/app/globals.css'
import { GlobalContextProvider } from '@/context/store'

dotenv.config()
config.autoAddCss = false

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Marvel Heroes',
	description: 'Entry-level Frontend Developer Test',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<GlobalContextProvider>
				<body className={`${inter.className} bg-secondary-500 h-auto`}>{children}</body>
			</GlobalContextProvider>
		</html>
	)
}

