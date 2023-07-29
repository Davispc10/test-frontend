import React from "react";
import Link from "next/link";
import { FavHeroesTitle } from "../atoms/FavHeroesTitle";
import { Heart } from "@phosphor-icons/react";

export const FavHeroesLink = () => {
  return (
    <Link href="/favheroes" className="flex md:flex-col justify-items-center items-center justify-center group">
      <Heart className="text-red-400 text-lg md:text-4xl group-hover:text-red-600 duration-300" />
      <FavHeroesTitle />
    </Link>
  )
}