import type { Metadata } from "next";
import Link from "next/link";

import ContextProvider from "@/context";

import "@/styles/index.css";

import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  description: "",
  icons: [
    {
      rel: "icon",
      href: "/favicon.ico",
      url: "/favicon.ico",
    },
  ],
  title: "Teste Dinheirow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="mid:max-w-3xl mx-auto flex h-full min-h-screen w-full flex-col gap-16 bg-white px-8 pb-32 pt-16 after:pointer-events-none after:fixed after:inset-0 after:-z-10 after:bg-[url('/comic-texture.png')] after:bg-cover after:opacity-5 sm:max-w-lg sm:px-0 md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
        <ContextProvider>
          {children}
          <footer className="flex w-full justify-center">
            <div className="group flex w-fit items-center gap-1 transition-colors">
              <Link
                href="https://antoniopataro.dev"
                rel="noreferrer"
                target="_blank"
                className="font-roboto text-sm font-bold text-red-500 transition-colors hover:text-red-500/75"
              >
                antoniopataro
              </Link>
              <ArrowUpRightIcon className="hidden w-0 -translate-x-1 -translate-y-px stroke-[4px] text-red-500/75 opacity-0 transition-all group-hover:w-2 group-hover:translate-x-0 group-hover:opacity-100 sm:block" />
            </div>
          </footer>
        </ContextProvider>
      </body>
    </html>
  );
}
