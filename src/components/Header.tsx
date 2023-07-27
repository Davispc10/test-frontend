import React from "react";
import Image from "next/image";
import Link from "next/link";
import {logoMarvel} from "@/utils/utils";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-5">
      <Link className="text-2xl font-bold" href="/">
        <Image
          src={logoMarvel}
          alt="Marvel Logo"
          width={300}
          height={300}
          className="object-cover cursor-pointer shadow-md hover:shadow-lg"
        />
      </Link>
    </header>
  );
}
