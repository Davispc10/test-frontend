import { useState } from "react";
import { useCharacters } from "@/hooks/useCharacters";
import { Character } from "@/types/character";
import { useRouter } from "next/navigation";
import Logo from "../../public/logo.svg";
import CharacterCard from "./CharacterCard";

function CharactersList() {
  const router = useRouter();

  const [page, setPage] = useState<number>(0);

  const { data } = useCharacters(page);

  const handleCharacterDetail = (id: any) => {
    router.push(`/character/${id}`);
  };

  const verifyImage = (character: any) => {
    return character && character.thumbnail.path.includes("image_not_available")
      ? Logo
      : character &&
          character.thumbnail.path + "." + character.thumbnail.extension;
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="flex w-4/5 justify-between flex-wrap">
          {data?.map((character: Character) => (
            <>
              <CharacterCard
                onClick={() => handleCharacterDetail(character.id)}
                src={verifyImage(character)}
                character={character}
              />
            </>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center h-14">
        <button
          onClick={() => setPage(page - 50)}
          disabled={page === 0}
          className="mr-7"
        >
          prev
        </button>
        <button onClick={() => setPage(page + 50)}>next</button>
      </div>
    </>
  );
}

export default CharactersList;
