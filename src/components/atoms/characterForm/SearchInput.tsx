import React from "react";

const SearchInput = ({ searchByName }: { searchByName?: string }) => {
  return (
    <input
      placeholder="Procurar por nome..."
      name="searchByName"
      defaultValue={searchByName}
      className="bg-transparent outline-none"
      type="text"
    />
  );
};

export default SearchInput;
