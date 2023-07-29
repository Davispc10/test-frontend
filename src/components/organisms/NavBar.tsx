import React from "react";
import { NavBarTitle } from "../atoms/NavBarTitle";
import { NavBarLogo } from "../molecules/NavBarLogo";
import { NavBarDescription } from "../atoms/NavBarDescription";

import { FavHeroesLink } from "../molecules/FavHeroesLink";
import { GithubLogo } from "@phosphor-icons/react";

export const NavBar = () => {
  return (
    <nav className="flex flex-col md:flex-row justify-center md:justify-around items-center w-full my-4 border-y-2 border-black text-3xl p-4 font-bangers">
      <a 
        href="https://github.com/gabrigomez/marvel-test/tree/gabriel_gomes" 
        target="blank"
        className="mb-4 border bg-red-700 border-white rounded-3xl md:rounded-full p-1 group"
      >
        <GithubLogo className="text-md md:text-4xl group-hover:text-red-500 duration-300" />
      </a>
      <div className="flex flex-col justify-center items-center">
        <NavBarLogo />
        <NavBarTitle />
        <NavBarDescription />
      </div>
      <div className="flex mt-4">
        <FavHeroesLink />
      </div>
    </nav>
  );
};