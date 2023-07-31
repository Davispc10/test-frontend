"use client";

import "./globals.css";
import type { Metadata } from "next";
import { QueryClientProvider, QueryClient } from "react-query";

export const metadata: Metadata = {
  title: "Teste Dinheirow",
  description: "Personagens da Marvel",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className="bg-zinc-900 text-zinc-50">{children}</body>
      </QueryClientProvider>
    </html>
  );
}
