import React from "react";
import Link from "next/link";

export const NavBarLogo = () => {
  return (
    <Link href="/" className="flex flex-col items-center justify-center group">
      <img
        className="w-[230px] h-[96px] mb-1 border-2 border-black group-hover:border-white duration-300" 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.png" 
        alt="" 
      />
    </Link>
  )
}