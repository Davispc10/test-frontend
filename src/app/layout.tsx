import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/lib/react-query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PokéDex",
  description: "Explore o universo Pokémon com detalhes, estatísticas, evoluções e muito mais.",
  icons: {
    icon: "/ball.png",
  },
};

import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-red-500/30`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <Navigation />
            <div className="lg:pl-24 min-h-screen">
              {children}
            </div>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
