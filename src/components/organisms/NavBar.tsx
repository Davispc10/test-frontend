import React from "react";
import { NavBarLogo } from "../molecules/NavBarLogo";
import { NavBarTitle } from "../atoms/NavBarTitle";
import { NavBarDescription } from "../atoms/NavBarDescription";

export const NavBar = () => {
  return (
    <nav className="flex flex-col items-center justify-center my-4 border-y-2 border-black text-3xl p-4 font-bangers">
      <NavBarLogo />
      <NavBarTitle />
      <NavBarDescription />
    </nav>
  );
};