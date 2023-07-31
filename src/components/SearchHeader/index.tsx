import { notchedStyles } from "@/styles/notchedStyles";
import React from "react";
import SearchInput from "./SearchInput";
import Image from "next/image";

import MarvelLogo from "../../../public/images/marvel-logo.png";

interface SearchHeaderProps {
  value: string;
  onChange: (value: string) => void;
}

// TODO - if theres time, change state control to redux
export default function SearchHeader({value, onChange}: SearchHeaderProps) {
  const { wrapper, content } = notchedStyles();

  
  return (
    <div className={wrapper({ className: "w-full" })}>
      <div className={content()}>
        <div className="flex gap-4">
          <Image
            src={MarvelLogo}
            alt="marvel logo"
            width={100}
            height={40}
            quality={100}
            className=" h-full object-contain max-sm:hidden"
          />
          <SearchInput value={value} onChange={onChange}/>
        </div>
      </div>
    </div>
  );
}
