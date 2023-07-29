"use client";

import React, { Suspense } from "react";
import { Undo2 } from "lucide-react";
import Image from "next/image";
import { Character } from "@/types/global";
import { useContext } from "react";
import { Context } from "@/context/contextApi";
import Loading from "./Loading";

export default function Character(character: Character) {
  const [loading, setLoading] = React.useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-between rounded-br-2xl rounded-tl-3xl hover:shadow-lg w-60 h-80 shadow-lg hover:bg-red-600 text-red-600 hover:text-white transition duration-500 ease-in-out transform pb-3">
        <Loading />
      </div>
    );
  }

  return (
    <div
      key={character.id}
      className="flex flex-col items-center justify-between rounded-br-2xl rounded-tl-3xl hover:shadow-lg w-60 h-80 shadow-lg hover:bg-red-600 text-red-600 hover:text-white transition duration-500 ease-in-out transform pb-3"
    >
      <div className="w-full h-48">
        <Image
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          width={300}
          height={300}
          className={`
            ${
              character.thumbnail.extension === ".png"
                ? "object-contain"
                : "object-cover"
            }
          w-full h-full rounded-tl-2xl
          `}
        />
      </div>
      <div className="flex flex-col items-center justify-center p-2 tracking-widest uppercase">
        <h2 className="text-xl font-bold text-center p-3 rounded-md shadow-md border border-red-800 hover:scale-105 transform transition duration-300 ease-in-out">
          {character.name}
        </h2>
      </div>
    </div>
  );
}
