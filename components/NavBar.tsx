import Link from "next/link";
//import Marvel from '../public/vercel.svg'
import React from "react";

export const NavBar = () => {
  return (
    <nav className="flex items-center justify-center mb-4 border-y border-red-500 text-3xl px-4 py-2 font-bangers">
      <Link href="/" className="flex flex-col items-center justify-center mb-4">
        <img
          className="w-[230px] h-[96px] mb-1" 
          src={"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg.png"} 
          alt="" />
        <p className="text-red-500 border-b border-white">
          THE MARVEL BOOK
        </p>
        <p className="text-xs">
          procure seus heróis favoritos
        </p>
      </Link>
    </nav>
  )
}