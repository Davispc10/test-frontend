"use client";

import SkeletonCharacterDetail from "@/components/organisms/skeletonCharacterDetail";
import CharacterDetailsTemplate from "@/components/templates/CharacterDetailsTemplate";
import ComicTemplate from "@/components/templates/ComicTemplate";
import { descriptionValidation } from "@/libs/descriptionValidation";
import { fetchCharacterById } from "@/libs/fetchCharacterById";
import { fechCharacterComics } from "@/libs/fetchCharacterComics";
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

        {isLoading ? (
          <SkeletonCharacterDetail />
        ) : (
          <CharacterDetailsTemplate data={data?.results} />
        )}

        <ComicTemplate charId={params.id} />
      </div>
    </div>
  );
};

export default CharacterDetails;
