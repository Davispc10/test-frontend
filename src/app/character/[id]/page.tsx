"use client";
import Loading from "@/components/molecules/Loading";
import { fetchCharacterById } from "@/libs/fetchCharacterById";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useQuery } from "react-query";

const CharacterDetails = ({ params }: { params: { id: string } }) => {
  const { isLoading, data } = useQuery(["character" + params.id], () =>
    fetchCharacterById(params.id)
  );

  const router = useRouter();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-neutral-800   text-neutral-50 min-h-screen px-20 py-10">
      <div className="max-w-screen-xl w-full mx-auto flex-col">
        <button
          onClick={router.back}
          className="flex items-center gap-2 bg-slate-600 text-neutral-50 p-2 rounded font-semibold"
        >
          Go Back <Undo2 />
        </button>

        {data?.results.map((char) => {
          return (
            <div key={char.id}>
              <h3>{char.name}</h3>

              <p>{char.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterDetails;
