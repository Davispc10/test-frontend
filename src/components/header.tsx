"use client";
import Image from "next/image";
import marvelLogo from "@/assets/marvel-logo.png";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [click, setClick] = useState(false);

  function handleToggleClick() {
    setClick(!click);
  }

  return (
    <header className="border-b-2 border-b-zinc-700 bg-zinc-900">
      <nav className="h-[12vh] flex justify-around items-center ">
        <Image height={60} src={marvelLogo} alt="logo" />
        <button className="hidden sm:block" onClick={handleToggleClick}>
          {click ? <X size={28} /> : <Menu size={28} />}
        </button>
        <ul
          className={`z-10 flex items-center font-semibold justify-around xl gap-8 bg-zinc-900 sm:absolute sm:top-[12vh] sm:h-[88vh] sm:w-screen sm:flex-col sm:p-16 ${
            click ? "sm:translate-x-0" : "sm:translate-x-full"
          } transition-transform`}
        >
          <li onClick={handleToggleClick}>
            <Link href="/" className="hover:text-red-500 transition-colors">
              {" "}
              Home
            </Link>
          </li>
          <li onClick={handleToggleClick}>
            <Link
              href="/characters/pages/1"
              className="hover:text-red-500 transition-colors"
            >
              {" "}
              Characters
            </Link>
          </li>
          <li onClick={handleToggleClick}>
            <Link
              href="https://github.com/YuriMont/test-frontend"
              className="hover:text-red-500 transition-colors"
            >
              Credits
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
