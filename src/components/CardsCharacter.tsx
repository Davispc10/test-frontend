"use client";

import React, { Suspense } from "react";
import { Undo2 } from "lucide-react";
import Image from "next/image";
import { Character } from "@/types/global";

export default function Character(character: Character) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        key={character.id}
        className="flex flex-col items-center justify-between bg-red-600 rounded-md hover:shadow-lg w-60 h-80 shadow-lg hover:bg-red-700 transition duration-500 ease-in-out transform py-3"
      >
        <div className="w-48 h-48">
          <Image
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
            width={300}
            height={300}
            className="object-cover w-full h-full rounded-md"
          />
        </div>
        <div className="flex flex-col items-center justify-center p-5">
          <h2 className="text-lg font-bold text-center text-gray-50">
            {character.name}
          </h2>
        </div>
      </div>
    </Suspense>
  );
}
