import CleanFiltersButton from "@/components/molecules/CharacterForm/CleanFiltersButton";
import SearchInputContainer from "@/components/molecules/CharacterForm/SearchInputContainer";
import React from "react";

const CharacterForm = ({ searchByName }: { searchByName?: string }) => {
  return (
    <form className="w-1/2 my-6 flex gap-2 items-center">
      <SearchInputContainer searchByName={searchByName} />
      {searchByName && <CleanFiltersButton />}
    </form>
  );
};

export default CharacterForm;
