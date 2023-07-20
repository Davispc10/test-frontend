import React from "react";
import Link from "next/link";

export const NavBar = () => {
  return (
    <nav className="flex items-center justify-center my-4 border-y-2 border-black text-3xl p-4 font-bangers">
      <Link href="/" className="flex flex-col items-center justify-center my-4">
        <img
          className="w-[230px] h-[96px] mb-1 border-2 border-black" 
          src={"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg.png"} 
          alt="" />
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