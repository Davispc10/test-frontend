import Card from "@/components/molecules/card/Card";
import { Character } from "@/interfaces/Characters";
import React from "react";

const CardList = ({ data }: { data?: Character[] }) => {
  if (data && data.length <= 0) {
    return <p>Nenhum personagem encontrado.</p>;
  }

  return data?.map((char) => <Card key={char.id} char={char} />);
};

export default CardList;
