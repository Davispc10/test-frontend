import "./globals.css";
import { OrganismHeader } from "@/components/organisms/header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { OrganismFooter } from "@/components/organisms/footer";

const inter = Inter({ subsets: ["latin"], weight: ["300", "600"] });

export const metadata: Metadata = {
  title: "The Marvel Challenge | Rian Junplid",
  description: "Challenge proposed by DinheiroW and developed by Rian Junplid",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-200`}>
        <OrganismHeader />
        <main style={{ minHeight: "calc(100vh - 130px)" }} className="px-3">
          {children}
        </main>
        <OrganismFooter />
      </body>
    </html>
  );
}
