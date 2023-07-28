import React from "react";
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
    <div
      key={character.id}
      className="flex flex-col items-center justify-between p-5 sm:px-5 w-full gap-5"
    >
      <div className="flex flex-row items-center justify-center max-w-sm shadow-md border">
        <Image
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name ? character.name : "No name"}
          width={500}
          height={500}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center text-red-600 p-3 rounded-md shadow-md border">
          {character.name}
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center p-5 shadow-lg border max-w-3xl">
        {commics?.length ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <h2 className="text-2xl font-bold text-center text-red-600 p-3 rounded-md shadow-md">
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
                  className="object-cover w-20 h-full hover:scale-105 cursor-pointer transition duration-300 ease-in-out transform"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-lg font-bold text-center text-red-600">
              Comics
            </h2>
            <div className="flex flex-col items-center justify-center">
              <p className="text-red-600 text-center">No comics</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center gap-3 p-5 shadow-md max-w-3xl w-full border">
        <h2 className="text-2xl font-bold text-center text-red-600 p-3 rounded-md shadow-md">
          Description
        </h2>
        <p className="text-red-600 text-center text-xl">
          {character.description
            ? character.description
            : "Descrição não informada"}
        </p>
      </div>
      <button
        className="flex flex-row items-center justify-center gap-2 bg-red-600 rounded-md hover:shadow-lg shadow-lg hover:bg-red-800 transition duration-500 ease-in-out transform p-5"
        onClick={() => router.back()}
      >
        <Undo2 size={24} className="text-white" />
      </button>
    </div>
  );
}
