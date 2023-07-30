'use client'

import { SearchContextProvider } from "@/contexts/search.context";
import { queryClient } from "@/services/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body className={inter.className}>
      <QueryClientProvider client={queryClient}>
      <SearchContextProvider>
        {children}
        </SearchContextProvider>
    </QueryClientProvider>
        </body>
    </html>
  );
}
