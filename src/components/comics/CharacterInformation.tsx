import FadeRightAnimation from "@/components/animations/FadeRight";
import HoverScaleAnimation from "@/components/animations/HoverScale";

import { Comic } from "@/features/comics";
import { Hero } from "@/features/heroes";

import clsx from "clsx";

import Zoom from "react-medium-image-zoom";

import { ArrowLeft as BackIcon } from "phosphor-react";

import Link from "next/link";
import Image from "next/image";

const CharacterInformation = ({
  hero,
  comics,
}: {
  hero: Hero;
  comics: Comic[];
}) => {
  return (
    <FadeRightAnimation className="flex flex-col gap-8 p-8 md:w-2/3 h-3/4 md:h-full md:p-16 md:justify-center">
      <div className="flex flex-col gap-2">
        <div className="flex">
          <Link
            href="/"
            className="flex items-center gap-2 p-3 mb-1 transition duration-200 ease-in-out rounded-md bg-marvel-red hover:bg-white hover:text-marvel-red "
          >
            <BackIcon weight="bold" />
            <span>Go back</span>
          </Link>
        </div>

        <h1 className="w-full text-3xl font-bold leading-tight break-words md:text-6xl">
          {hero.name}
        </h1>
        <p className="md:text-xl">{hero.description}</p>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold md:text-3xl">Appearence in Comics</h2>
        <div className="flex flex-col items-start justify-center w-full overflow-x-auto overflow-y-hidden touch-pan-x">
          <div className="inline-flex flex-row items-center justify-center w-auto h-full px-2 py-6 space-x-4 flex-nowrap">
            {comics.map((comic, i) => (
              <HoverScaleAnimation
                key={i}
                className={clsx("flex items-center aspect-[3/4] w-36 h-full", {
                  "bg-marvel-red": comic.thumbnail.path.includes("marvel-logo"),
                })}
              >
                <Zoom zoomMargin={40} classDialog="custom-zoom">
                  <Image
                    width={500}
                    height={500}
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                    className={clsx("object-cover w-full h-full", {
                      "object-contain":
                        comic.thumbnail.path.includes("marvel-logo"),
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
