import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Header } from "@/components/molecules/Header"
import { ReactQueryProvider } from "@/providers/ReactQueryProvider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Marvel App",
  description: "Website to search for marvel heroes.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body style={inter.style} className="bg-zinc-900 text-zinc-100">
        <Header />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  )
}
