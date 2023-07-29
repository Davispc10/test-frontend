import Image from "next/image";
import React from "react";

import Logo from "/public/images/marvel_logo.png";
import SearchNameActionTypes from "@/redux/searchName/action-types";
import { GoSearch } from "react-icons/go";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Header = () => {
  const searchName = useSelector(
    (state: { searchName: string }) => state.searchName
  );
  const dispatch = useDispatch();

  const handleText = (e: any) => {
    dispatch({
      type: SearchNameActionTypes.WRITE,
      payload: e.target.value,
    });
  };

  return (
    <header className="flex justify-center lg:justify-between items-center p-8">
      <div className="lg:block hidden">
        <Image src={Logo} width={250} alt="Logo Marvel" />
      </div>

      <div className="px-2 py-2 flex items-center justify-center w-fit border-red-500 border-[1px] rounded-md">
        <input
          type="text"
          defaultValue={searchName}
          onChange={handleText}
          placeholder="Pesquisar heroi"
          className="bg-transparent px-4"
        />
        <GoSearch className="cursor-pointer px-2" color={"#000"} size={35} />
      </div>

      <div className=" w-[250px] lg:block hidden" />
    </header>
  );
};

export default Header;
