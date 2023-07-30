import { MagnifyingGlass } from "@phosphor-icons/react";
import React from "react";
import { tv } from "tailwind-variants";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const inputStyle = tv({
  base: `
    placeholder:italic
    placeholder:text-gray-100
    text-white
    pl-4 pr-9 py-1
    bg-black/80
    w-full
    [&:focus]:outline-blue-500
  `,
});

export default function SearchInput({
  value,
  onChange,
  className,
}: SearchInputProps) {
  return (
    <label htmlFor="header-search-input" className="relative flex gap-2 w-full">
      <input
        type="text"
        id="header-search-input"
        className={inputStyle(className)}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder="Search for a character"
      />
      <button className={"cursor-pointer transition hover:scale-110"}>
        <MagnifyingGlass size={24} />
      </button>
    </label>
  );
}
