import React from "react";
import Link from "next/link";
import Image from "next/image";

export const NavBar = () => {
  return (
    <nav className="flex items-center justify-center my-4 border-y-2 border-black text-3xl p-4 font-bangers">
      <Link href="/" className="flex flex-col items-center justify-center my-4">
        <Image
          width={230}
          height={96}
          className="w-[230px] h-[96px] mb-1 border-2 border-black" 
          src="/../public/navBarLogo.png" 
          alt="" 
        />
        <p className="text-red-500 border-y-2 border-black">
          THE MARVEL BOOK
        </p>
        <p className="text-xs">
          find your favourite heroes!
        </p>
      </Link>
    </nav>
  );
};