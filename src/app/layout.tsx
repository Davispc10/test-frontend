import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-arcade",
});

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Explore o mundo dos Pokémon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${pressStart2P.variable}`}>
      <body className="font-sans bg-background min-h-screen">
        <header className="bg-red-600 text-white shadow-lg sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 shrink-0">
                <div className="w-8 h-8 rounded-full border-[3px] border-white overflow-hidden">
                  <div className="h-[13px] bg-white/90" />
                  <div className="h-[2px] bg-white" />
                  <div className="h-[13px] bg-white/20" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white border-2 border-red-600" />
                </div>
              </div>
              <span className="font-arcade text-xs sm:text-sm tracking-wider text-white">
                Pokédex
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 opacity-30" aria-hidden="true">
              <div className="w-2.5 h-2.5 rounded-full border border-white" />
              <div className="w-2.5 h-2.5 rounded-full border border-white" />
              <div className="w-2.5 h-2.5 rounded-full border border-white" />
            </div>
          </div>
        </header>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
