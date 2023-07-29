import { useState } from "react";
import Image from "next/image";
import { useCharacters } from "@/hooks/useCharacters";
import { Character } from "@/types/character";
import { useRouter } from "next/navigation";

function CharactersList() {
  const router = useRouter();

  const [page, setPage] = useState<number>(0);

  const { data } = useCharacters(page);

  const handleCharacterDetail = (id: any) => {
    router.push(`/character/${id}`)
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <button
          onClick={() => setPage(page - 20)}
          disabled={page === 0}
          className="mr-7"
        >
          prev
        </button>
        <button onClick={() => setPage(page + 20)}>next</button>
      </div>
      <div className="w-full flex justify-center">
        <div className="flex w-4/5 justify-between flex-wrap">
          {data?.map((character: Character) => (
            <div
              key={character.id}
              className="my-5 h-80 relative cursor-pointer rounded-xl"
              onClick={() => handleCharacterDetail(character.id)}
            >
              <div>
                <Image
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                  width={320}
                  height={320}
                  unoptimized
                  className="max-w-full	rounded-xl h-80	"
                />
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 p-2 text-white w-full text-center rounded-t-lg">
                  <h2 className="text-xl">{character.name}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CharactersList;
