"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Character } from "@/types/character";
import Logo from "../../../../public/logo.svg";
import { useCharacterDetail } from "@/hooks/characterDetailQuery";
import { useCharacterComics } from "@/hooks/useCharacterComics";
import Loader from "@/components/Loader";
import ComicsCard from "@/components/ComicsCard";

interface CharacterDetailProps {
  params: {
    characterId: string;
  };
}
function CharacterDetail({ params }: CharacterDetailProps) {
  const router = useRouter();

  const { characterId } = params;

  const { data, isLoading: loadingDetails } = useCharacterDetail(characterId);

  const { data: comics, isLoading: loadingComics } =
    useCharacterComics(characterId);

  const handleNavigate = () => {
    router.push("/");
  };

  const verifyDescription =
    data && !!data[0].description
      ? data[0].description
      : "Descrição não informada";

  const verifyImage =
    data && data[0].thumbnail.path.includes("image_not_available")
      ? Logo
      : data && data[0].thumbnail.path + "." + data[0].thumbnail?.extension;

  return (
    <>
      {loadingDetails && loadingComics && <Loader />}
      <div className="w-full h-screen flex justify-center">
        <div className="w-4/5 h-screen">
          <div className="my-8 h-12">
            <button
              className="font-title text-2xl text-zinc-800"
              onClick={handleNavigate}
            >
              Voltar
            </button>
          </div>
          <div>
            {data?.map((item: Character) => (
              <div key={item.id}>
                <div className="flex flex-col lg:flex-row">
                  <Image
                    src={verifyImage}
                    alt={item.name}
                    width={500}
                    height={500}
                    unoptimized
                    className="max-w-full	rounded-xl h-3/6	"
                  />
                  <div className="flex flex-col w-full items-start lg:items-center justify-center lg:ml-12">
                    <h3 className="font-title text-5xl flex justify-center mb-8">
                      {item.name}
                    </h3>
                    <div className="lg:mx-12">
                      <h3 className="text-zinc-800 text-base font-medium	">
                        {verifyDescription}
                      </h3>
                    </div>
                  </div>
                </div>
                {comics && comics?.length > 0 && (
                  <>
                    <div className="flex items-center my-10 justify-center">
                      <h3 className="font-title text-center text-3xl text-zinc-800">
                        Confira alguns quadrinhos
                      </h3>
                    </div>
                    <div className="flex w-full flex-wrap pt-8 justify-around">
                      {comics?.map((item: any, index: number) => (
                        <div key={index} className="flex">
                          <ComicsCard
                            title={item.title}
                            src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CharacterDetail;
