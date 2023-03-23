import FadeRightAnimation from '@/components/animations/FadeRight';
import HoverScaleAnimation from '@/components/animations/HoverScale';

import { Comic } from '@/features/comics';
import { Hero } from '@/features/heroes';

import clsx from 'clsx';

const CharacterInformation = ({
  hero,
  comics,
}: {
  hero: Hero;
  comics: Comic[];
}) => {
  return (
    <FadeRightAnimation className="flex flex-col gap-8 w-2/3 h-full p-16 justify-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-6xl font-bold break-words w-full leading-tight">
          {hero.name}
        </h1>
        <p className="text-xl">{hero.description}</p>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold">Appearence in Comics</h2>
        <div className="flex flex-col w-full overflow-x-auto touch-pan-x overflow-y-hidden justify-center items-start">
          <div className="inline-flex flex-nowrap flex-row justify-center items-center w-auto h-full py-6 space-x-4 px-2">
            {comics.map((comic) => (
              <HoverScaleAnimation
                key={comic.id}
                options={{
                  scale: 1.002,
                }}
                className="w-32 h-full flex items-center bg-marvel-red"
              >
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                  className={clsx('hover:scale-[1.05] transition ease-in-out', {
                    'object-contain':
                      comic.thumbnail.path.includes('marvel-logo'),
                    'object-cover w-full h-full':
                      !comic.thumbnail.path.includes('marvel-logo'),
                  })}
                />
              </HoverScaleAnimation>
            ))}
          </div>
        </div>
      </div>
    </FadeRightAnimation>
  );
};

export default CharacterInformation;
