import "./globals.css";
import type { Metadata } from "next";
import { Marvel } from "next/font/google";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ContextProvider } from "@/context/contextApi";

const marvel = Marvel({ subsets: ["latin"], weight: "700" });

export const metadata: Metadata = {
  title: "Desafio Marvel",
  description: "Teste Front-End Dinheirow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={marvel.className}>
        <ContextProvider>
          <Header />
          {children}
          <Footer />
        </ContextProvider>
      </body>
    </html>
  );
}
