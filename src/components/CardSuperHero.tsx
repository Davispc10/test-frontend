import React, { Suspense } from "react";
import { Undo2 } from "lucide-react";
import Image from "next/image";
import { Character } from "@/types/global";

export default function Character({ character }: { character: Character }) {
  return (
    <Suspense fallback={<div>Loading...</div>} unstable_expectedLoadTime={1000}>
      <div
        key={character.id}
        className="flex flex-col items-center justify-between bg-red-600 rounded-md hover:shadow-lg shadow-lg hover:bg-red-700 transition duration-500 ease-in-out transform py-3 w-96"
      >
        <div className="w-48 h-48">
          <Image
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name ? character.name : "No name"}
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
        <p className="text-gray-50 text-center">
          {character.description ? character.description : "No description"}
        </p>
      </div>
    </Suspense>
  );
}
