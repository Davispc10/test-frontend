"use client";
import CleanFiltersButton from "@/components/molecules/CharacterForm/CleanFiltersButton";
import SearchInputContainer from "@/components/molecules/CharacterForm/SearchInputContainer";
import { useSearchParams } from "next/navigation";
import React from "react";

const CharacterForm = () => {
  const params = useSearchParams();

  const searchByName = params.get("searchByName") as string | undefined;
  return (
    <form className="w-1/2 my-6 flex gap-2 items-center">
      <SearchInputContainer searchByName={searchByName} />
      {searchByName && <CleanFiltersButton />}
    </form>
  );
};

export default CharacterForm;
