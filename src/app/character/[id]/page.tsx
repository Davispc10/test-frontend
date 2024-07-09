"use client";

import { descriptionValidation } from "@/libs/DescriptionValidation";
import { fetchCharacterById } from "@/libs/fetchCharacterById";
import { imagePathValidation } from "@/libs/ImagePathValidation";
import { Undo2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";

const CharacterDetails = ({ params }: { params: { id: string } }) => {
  const { isLoading, data } = useQuery(["character" + params.id], () =>
    fetchCharacterById(params.id)
  );
  const { data: comicsData, isLoading: IsLoadingComics } = useQuery([
    "characterComic" + params.id,
  ]);

  const router = useRouter();

  return (
    <div className="bg-neutral-800   text-neutral-50 min-h-screen px-20 py-10">
      <div className="max-w-screen-xl gap-5 flex w-full mx-auto flex-col">
        <button
          onClick={router.back}
          className="flex w-fit items-center gap-2 bg-slate-600 text-neutral-50 p-2 rounded font-semibold"
        >
          Voltar <Undo2 />
        </button>
        <div>
          {data?.results.map((char) => {
            return (
              <div key={char.id} className="flex  justify-between">
                <div>
                  <h2 className="text-3xl font-semibold">{char.name}</h2>
                  <p>{descriptionValidation(char.description)}</p>
                </div>

                <Image
                  src={imagePathValidation(
                    char.thumbnail?.path,
                    char.thumbnail?.extension
                  )}
                  width={400}
                  height={400}
                  className="rounded-md hover:shadow-lg hover:shadow-slate-50/25 hover:scale-105 duration-300 "
                  alt={`Foto do personagem: ${char.name}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
