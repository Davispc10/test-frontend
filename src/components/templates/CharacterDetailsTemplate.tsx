import { Character } from "@/interfaces/Characters";
import React from "react";
import CharacterDetail from "../organisms/CharacterDetail.tsx";

const CharacterDetailsTemplate = ({ data }: { data?: Character[] }) => {
  return (
    <div>
      {data?.map((char) => (
        <CharacterDetail key={char.id} data={char} />
      ))}
    </div>
  );
};

export default CharacterDetailsTemplate;
