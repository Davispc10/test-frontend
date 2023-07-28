import React from "react";
import Image from "next/image";
import Link from "next/link";
import { logoMarvel, extensionImage } from "@/utils/utils";

export default function Header() {
  return (
    <header className="flex items-center justify-center p-5 shadow-md border-br border-red-500 w-full hover:shadow-lg transition duration-300 ease-in-out transform">
      <Link className="text-2xl font-bold" href="/">
        <Image
          src={logoMarvel + extensionImage}
          alt="Marvel Logo"
          width={700}
          height={700}
          className="object-cover cursor-pointer shadow-md hover:shadow-lg w-80"
        />
      </Link>
    </header>
  );
}
