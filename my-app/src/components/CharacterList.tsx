import { useContext } from "react";

import { useRouter } from "next/navigation";
import Logo from "../../public/logo.svg";
import CharacterCard from "./CharacterCard";
import Button from "./Button";
import ScrollToTopButton from "./ButtonScrollTop";
import Loader from "./Loader";
import { SearchContext } from "../contexts/search.context";
import { useCharactersList } from "hooks/useCharactersList";
import { Character } from "types/character";

function CharactersList() {
  const router = useRouter();

  const { page, setPage } = useContext(SearchContext);
  const { data, isLoading } = useCharactersList(Number(page));

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
      setPage(Number(page) - 100);
    } else {
      setPage(Number(page) + 100);
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
              <div key={character.id}>
                <CharacterCard
                  onClick={() => handleCharacterDetail(character.id)}
                  src={verifyImage(character)}
                  character={character}
                />
              </div>
            ))}
          </div>
        </div>
        {!isLoading && (
          <>
            <div className="w-full flex justify-center h-14 my-10 items-center">
              <Button
                onClick={() => handleClick("prev")}
                disabled={Number(page) === 0}
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
