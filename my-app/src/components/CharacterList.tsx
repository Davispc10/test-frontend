import { useState } from "react";
import { useCharactersList } from "@/hooks/useCharactersList";
import { Character } from "@/types/character";
import { useRouter } from "next/navigation";
import Logo from "../../public/logo.svg";
import CharacterCard from "./CharacterCard";
import Button from "./Button";
import ScrollToTopButton from "./ButtonScrollTop";
import Loader from "./Loader";

function CharactersList() {
  const router = useRouter();

  const [page, setPage] = useState<number>(0);

  const { data, isLoading } = useCharactersList(page);

  const handleCharacterDetail = (id: any) => {
    router.push(`/character/${id}`);
  };

  const verifyImage = (character: any) => {
    return character && character.thumbnail.path.includes("image_not_available")
      ? Logo
      : character &&
          character.thumbnail.path + "." + character.thumbnail.extension;
  };

  const handleClick = (name: string) => {
    if (name === "prev") {
      setPage(page - 100);
    } else {
      setPage(page + 100);
    }
    return handleScrollToTop();
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isLoading && <Loader />}
      <div>
        <div className="w-full flex justify-center min-h-screen	">
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
        {!isLoading && (
          <>
            <div className="w-full flex justify-center h-14 my-10 items-center">
              <Button
                onClick={() => handleClick("prev")}
                disabled={page === 0}
                text={"Voltar"}
              />
              <Button
                onClick={() => handleClick("next")}
                disabled={data?.length < 100}
                text={"Avançar"}
              />
            </div>
            <div className="fixed bottom-0">
              <ScrollToTopButton />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CharactersList;
