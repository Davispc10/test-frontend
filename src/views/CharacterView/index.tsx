import MarvelLikeLabel from "@/components/MarvelLikeLabel";
import MyContainer from "@/components/MyContainer";
import { queryClient } from "@/pages/_app";
import { marvelApi } from "@/services/marvelApi";
import { CharactersApiResult } from "@/types/Character";
import { ComicsApiResult } from "@/types/Comic";
import { API_LINKS } from "@/utils/apiLinks";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import HorizontalScrollable from "./components/HorizontalScrollable";
import BackIcon from "./components/BackIcon";
import Lightbox from "yet-another-react-lightbox";
import { Counter, Zoom } from "yet-another-react-lightbox/plugins";
import BodySkeleton from "./components/CharacterViewSkeleton";
import { generateMd5Hash } from "@/utils/generateHash";

interface CharacterViewProps {
  resultFromApi: CharactersApiResult;
}

export default function CharacterView({ resultFromApi }: CharacterViewProps) {
  const router = useRouter();

  const [selectedPhoto, setSelectedPhoto] = useState(NaN);
  const character = resultFromApi.data.results[0];

  const { data, refetch, error } = useQuery<ComicsApiResult>({
    queryKey: ["comics", character.id],
    enabled: false,
    queryFn: async () => {
      const ts = Date.now();
      const { data } = await marvelApi.get<ComicsApiResult>(
        API_LINKS.characterComics(character.id.toString())
      );
      return data;
    },
  });

  const comicsImagesCanRepeat = data?.data.results?.map((comic, _, arr) => {
    if (comic.thumbnail.path.includes("image_not_available")) {
      return "/images/marvel-placeholder.jpg";
    }
    return comic.thumbnail.path + "." + comic.thumbnail.extension;
  });

  const distinctComicsImages =
    comicsImagesCanRepeat?.filter((comic, idx, arr) => {
      return arr.indexOf(comic) === idx;
    }) || [];

  useEffect(() => {
    refetch();
  }, []);

  // how the heck web doesn't have an api to check if can go back?
  function handleGoBack() {
    router && router.back && router.back();
  }

  function handleCloseLightbox() {
    setSelectedPhoto(NaN);
  }
  // for any reason that doesn't make sense, the ArrowUUpLeft was causing a production error
  // so I had to use a svg instead, i think the problem is that phosphor doesn't have proper
  // integration with SSR
  // I tried to use the another icon from Phosphor but it was causing the same error
  // TODO - open an issue on Phosphor repo

  return (
    <MyContainer>
      <button
        onClick={handleGoBack}
        className="flex gap-4 items-center mb-4 [&:hover>svg]:stroke-red-500 border-none"
      >
        <BackIcon />
        <p className="text-2xl">Back</p>
      </button>
      <div className="flex gap-4 max-md:flex-col">
        <div className="relative aspect-[11/16] max-w-[22rem] w-full overflow-hidden">
          <Image
            src={character.thumbnail.path + "." + character.thumbnail.extension}
            alt={`${character.name}'s photo`}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col py-8">
          <MarvelLikeLabel className="text-7xl max-sm:text-5xl font-bold mt-4">
            {character.name}
          </MarvelLikeLabel>
          <p className="text-black text-2xl font-bold mt-8">
            {character.description}
          </p>

          <p className="text-black text-xl leading mt-8 font-bold">
            Comics available: {character.comics.available}
          </p>
          <p className="text-black text-xl leading-tight font-bold">
            Series available: {character.series.available}
          </p>
          <p className="text-black text-xl leading-tight font-bold">
            Stories available: {character.stories.available}
          </p>
          <p className="text-black text-xl leading-tight font-bold">
            Events available: {character.events.available}
          </p>
        </div>
      </div>
      <HorizontalScrollable
        characterName={character.name}
        comicsImages={distinctComicsImages}
        onSelectComicPhoto={setSelectedPhoto}
      />
      <Lightbox
        open={!Number.isNaN(selectedPhoto)}
        plugins={[Counter, Zoom]}
        counter={{ container: { style: { top: "unset", bottom: 0 } } }}
        controller={{
          closeOnBackdropClick: true,
        }}
        index={selectedPhoto}
        close={handleCloseLightbox}
        slides={distinctComicsImages.map((i) => ({ src: i }))}
        styles={{
          container: {
            backgroundColor: "rgba(0,0,0,0.92)",
          },
        }}
      />
    </MyContainer>
  );
}
