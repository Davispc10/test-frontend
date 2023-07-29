import React from "react";
import Image from "next/image";
import Link from "next/link";

export const NavBarLogo = () => {
  return (
    <Link href="/" className="flex flex-col items-center justify-center group">
      <Image
        width={230}
        height={96}
        className="w-[230px] h-[96px] mb-1 border-2 border-black group-hover:border-white duration-300" 
        src="/../public/navBarLogo.png" 
        alt="" 
      />
    </Link>
  )
}