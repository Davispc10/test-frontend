import Link from "next/link";
import React from "react";

const CharacterDetailsBtn = ({ charId }: { charId: number }) => {
  return (
    <Link
      className="bg-slate-600 mx-auto flex items-center justify-center hover:bg-slate-500 duration-200 rounded w-32 h-10"
      href={`/character/${charId}`}
    >
      Ver Mais
    </Link>
  );
};

export default CharacterDetailsBtn;
