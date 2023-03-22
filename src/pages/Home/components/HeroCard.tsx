import FadeInAnimation from '@/components/animations/FadeIn';
import HoverScaleAnimation from '@/components/animations/HoverScale';
import { Hero } from '@/features/heroes';

import { PlusCircle as PlusIcon } from 'phosphor-react';

const HeroCard = ({ hero }: { hero: Hero }) => {
  return (
    <a href={`/character/${hero.id}`}>
      <HoverScaleAnimation className="cursor-pointer">
        <FadeInAnimation>
          <div className="bg-white flex flex-col items-center justify-center rounded-lg shadow-lg h-64 w-64 p-1 relative">
            {/* More info on hover */}
            <div className="bg-marvel-red/30 rounded-lg absolute inset-0 bg-white flex items-center justify-center opacity-0 hover:opacity-100">
              <div className="flex items-center gap-1 bg-marvel-red px-2 py-1 rounded-lg">
                <PlusIcon size={20} weight="fill" />
                <span className="text-white font-bold uppercase">See more</span>
              </div>
            </div>

            <div className="flex bg-white rounded-t-lg shadow-lg w-full h-full items-center justify-center overflow-hidden">
              <img
                src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                alt={hero.name}
                className="object-fill"
              />
            </div>
            <div className="bg-marvel-red text-white w-full p-1 rounded-b-lg h-10 flex items-center justify-center">
              <h2 className="text-center font-bold truncate">{hero.name}</h2>
            </div>
          </div>
        </FadeInAnimation>
      </HoverScaleAnimation>
    </a>
  );
};

export default HeroCard;
