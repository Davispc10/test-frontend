import React, { Suspense } from "react";
import { Undo2 } from "lucide-react";
import Image from "next/image";
import { Character, ResultComicsData } from "@/types/global";
import { useRouter } from "next/navigation";

interface CharacterProps {
  character: Character;
  commics?: ResultComicsData[] | undefined;
}

export default function CardSuperHero({ character, commics }: CharacterProps) {
  const router = useRouter();
  return (
    <Suspense fallback={<div>Loading...</div>} unstable_expectedLoadTime={1000}>
      <div
        key={character.id}
        className="flex flex-col items-center justify-between bg-red-600 rounded-md hover:shadow-lg shadow-lg transition duration-500 ease-in-out transform p-5 w-[60%] gap-5"
      >
        <div>
          <Image
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name ? character.name : "No name"}
            width={300}
            height={300}
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold text-center text-gray-50">
            {character.name}
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center p-5">
          {commics?.length ? (
            <div className="flex flex-col items-center justify-center gap-3">
              <h2 className="text-2xl font-bold text-center text-gray-50">
                Comics
              </h2>
              <div className="flex flex-row flex-wrap items-center justify-center gap-3">
                {commics?.map((comic) => (
                  <Image
                    key={comic.id}
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title ? comic.title : "No title"}
                    width={300}
                    height={300}
                    className="object-cover w-20 h-full rounded-md hover:scale-105 cursor-pointer transition duration-300 ease-in-out transform"
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-lg font-bold text-center text-gray-50">
                Comics
              </h2>
              <div className="flex flex-col items-center justify-center">
                <p className="text-gray-50 text-center">No comics</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center items-center gap-3 p-10 shadow-md">
          <h2 className="text-xl font-bold text-center text-gray-50">
            Description
          </h2>
          <p className="text-gray-50 text-center">
            {character.description ? character.description : "Descrição não informada"}
          </p>
        </div>
        <button
          className="flex flex-row items-center justify-center gap-2 bg-red-800 rounded-md hover:shadow-lg shadow-lg hover:bg-red-800 transition duration-500 ease-in-out transform p-5"
          onClick={() => router.back()}
        >
          <Undo2 size={24} className="text-white" />
        </button>
      </div>
    </Suspense>
  );
}
