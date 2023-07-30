"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Character } from "@/types/character";
import Logo from "../../../../public/logo.svg";
import { useCharacterDetail } from "@/hooks/characterDetailQuery";
import { useCharacterComics } from "@/hooks/useCharacterComics";

interface CharacterDetailProps {
  params: {
    characterId: string;
  };
}
function CharacterDetail({ params }: CharacterDetailProps) {
  const router = useRouter();

  const { characterId } = params;

  const { data } = useCharacterDetail(characterId);

  const { data: comics } = useCharacterComics(characterId);

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
      : data && data[0].thumbnail.path + "." + data[0].thumbnail.extension;

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-4/5  h-screen">
        <div className="my-8 h-12">
          <button className="font-title text-2xl" onClick={handleNavigate}>
            Voltar
          </button>
        </div>
        <div>
          {data?.map((item: Character) => (
            <div key={item.id}>
              <div className="flex">
                <Image
                  src={verifyImage}
                  alt={item.name}
                  width={500}
                  height={500}
                  unoptimized
                  className="max-w-full	rounded-xl h-3/6	"
                />
                <div className="flex flex-col w-full justify-center ml-12">
                  <h3 className="font-title text-5xl flex justify-center mb-8">
                    {item.name}
                  </h3>
                  <div className="mx-12">
                    <h3>{verifyDescription}</h3>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-wrap pt-8">
                {comics?.map((item: any, index: number) => (
                  <div
                    className="flex flex-col items-center justify-center w-1/4 h-72"
                    key={index}
                  >
                    <div className="h-12">
                      <p className="text-sm	">{item.title}</p>
                    </div>
                    <Image
                      src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                      alt={item.title}
                      width={150}
                      height={150}
                      unoptimized
                      priority
                      className="max-w-full	rounded-xl h-52	"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;
