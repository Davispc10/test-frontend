import FadeInAnimation from "@/components/animations/FadeIn";
import HoverScaleAnimation from "@/components/animations/HoverScale";
import { Hero } from "@/features/heroes";
import Image from "next/image";
import Link from "next/link";

import { PlusCircle as PlusIcon } from "phosphor-react";

const HeroCard = ({ hero }: { hero: Hero }) => {
  return (
    <Link href={`/character/${hero.id}`}>
      <HoverScaleAnimation className="cursor-pointer">
        <FadeInAnimation>
          <div className="relative flex flex-col items-center justify-center w-64 h-64 p-1 bg-white rounded-lg shadow-lg">
            {/* More info on hover */}
            <div className="absolute inset-0 flex items-center justify-center rounded-lg opacity-0 bg-marvel-red/30 hover:opacity-100">
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-marvel-red">
                <PlusIcon size={20} weight="fill" />
                <span className="font-bold text-white uppercase">See more</span>
              </div>
            </div>

            <div className="flex items-center justify-center w-full h-full overflow-hidden bg-white rounded-t-lg shadow-lg">
              <Image
                src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                alt={hero.name}
                className="object-fill"
              />
            </div>
            <div className="flex items-center justify-center w-full h-10 p-1 text-white rounded-b-lg bg-marvel-red">
              <h2 className="font-bold text-center truncate">{hero.name}</h2>
            </div>
          </div>
        </FadeInAnimation>
      </HoverScaleAnimation>
    </Link>
  );
};

export default HeroCard;
