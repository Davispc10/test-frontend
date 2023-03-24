import FadeRightAnimation from "@/components/animations/FadeRight";
import HoverScaleAnimation from "@/components/animations/HoverScale";

import { Comic } from "@/features/comics";
import { Hero } from "@/features/heroes";

import clsx from "clsx";

import Zoom from "react-medium-image-zoom";

import { ArrowLeft as BackIcon } from "phosphor-react";

import Link from "next/link";

const CharacterInformation = ({
  hero,
  comics,
}: {
  hero: Hero;
  comics: Comic[];
}) => {
  return (
    <FadeRightAnimation className="flex flex-col gap-8 md:w-2/3 h-3/4 md:h-full md:p-16 p-8 md:justify-center">
      <div className="flex flex-col gap-2">
        <div className="flex">
          <Link
            href="/"
            className="bg-marvel-red p-3 rounded-md flex items-center gap-2 mb-1
              hover:bg-white hover:text-marvel-red transition ease-in-out duration-200
            "
          >
            <BackIcon weight="bold" />
            <span>Go back</span>
          </Link>
        </div>

        <h1 className="text-3xl md:text-6xl font-bold break-words w-full leading-tight">
          {hero.name}
        </h1>
        <p className="md:text-xl">{hero.description}</p>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="md:text-3xl text-xl font-bold">Appearence in Comics</h2>
        <div className="flex flex-col w-full overflow-x-auto touch-pan-x overflow-y-hidden justify-center items-start">
          <div className="inline-flex flex-nowrap flex-row justify-center items-center w-auto h-full py-6 space-x-4 px-2">
            {comics.map((comic) => (
              <HoverScaleAnimation
                key={comic.id}
                className="w-32 h-full flex items-center"
              >
                <Zoom zoomMargin={40} classDialog="custom-zoom">
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                    className={clsx({
                      "object-contain":
                        comic.thumbnail.path.includes("marvel-logo"),
                      "object-cover w-full h-full":
                        !comic.thumbnail.path.includes("marvel-logo"),
                    })}
                  />
                </Zoom>
              </HoverScaleAnimation>
            ))}
          </div>
        </div>
      </div>
    </FadeRightAnimation>
  );
};

export default CharacterInformation;
