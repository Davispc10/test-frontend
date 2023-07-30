"use client";

import axios from "axios";
import md5 from "md5";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Character } from "@/types/character";
import Logo from "../../../../public/logo.svg";

interface CharacterDetailProps {
  params: {
    characterId: string;
  };
}
function CharacterDetail({ params }: CharacterDetailProps) {
  const router = useRouter();

  const [detail, setDetail] = useState<Character[] | undefined>();

  const [comics, setComics] = useState<any | undefined>([]);

  const { characterId } = params;

  const handleNavigate = () => {
    router.push("/");
  };

  const fetcher = (characterId: string) => {
    const publicKey = "4e40b49f1b98db89d8c51844520b45be";
    const privateKey = "90d65ffd631bbcc29c7014a6190fb693d12d2b17";
    const timestamp = new Date().getTime();
    const hash = md5(timestamp + privateKey + publicKey);

    const apiUrl = "https://gateway.marvel.com/v1/public";

    const query = `ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
    axios
      .get(`${apiUrl}/characters/${characterId}?${query}`)
      .then((res) => setDetail(res.data.data.results));
  };

  const fetchComics = async (characterId: string) => {
    const publicKey = "4e40b49f1b98db89d8c51844520b45be";
    const privateKey = "90d65ffd631bbcc29c7014a6190fb693d12d2b17";
    const timestamp = new Date().getTime();
    const hash = md5(timestamp + privateKey + publicKey);

    const apiUrl = "https://gateway.marvel.com/v1/public";

    const query = `ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

    try {
      const res = await axios.get(
        `${apiUrl}/characters/${characterId}/comics?${query}`
      );
      setComics(res.data.data.results);
    } catch (error) {
      console.error("Ocorreu um erro ao buscar os quadrinhos:", error);
    }
  };

  useEffect(() => {
    fetcher(characterId);
    fetchComics(characterId);
  }, [characterId]);

  const verifyDescription =
    detail && !!detail[0].description
      ? detail[0].description
      : "Descrição não informada";

  const verifyImage =
    detail && detail[0].thumbnail.path.includes("image_not_available")
      ? Logo
      : detail &&
        detail[0].thumbnail.path + "." + detail[0].thumbnail.extension;

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-4/5  h-screen">
        <div className="my-8 h-12">
          <button className="font-title text-2xl" onClick={handleNavigate}>
            Voltar
          </button>
        </div>
        <div>
          {detail?.map((item: Character) => (
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
