import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import ReactQueryProvider from "./providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Teste Frontend - Marvel API",
  description: "Teste Frontend - Marvel API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}