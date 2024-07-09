import SearchButton from "@/components/atoms/characterForm/SearchButton";
import SearchInput from "@/components/atoms/characterForm/SearchInput";
import React from "react";

const SearchInputContainer = ({ searchByName }: { searchByName?: string }) => {
  return (
    <label className="flex gap-2 flex-1 relative rounded-full bg-neutral-50 p-3">
      <SearchInput searchByName={searchByName} />
      <SearchButton />
    </label>
  );
};

export default SearchInputContainer;
