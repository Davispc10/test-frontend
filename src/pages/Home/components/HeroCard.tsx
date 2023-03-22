import FadeInAnimation from '@/components/animations/FadeIn';
import HoverScaleAnimation from '@/components/animations/HoverScale';
import { Hero } from '@/features/heroes';

const HeroCard = ({ hero }: { hero: Hero }) => {
  return (
    <HoverScaleAnimation
      options={{
        scale: 1.05,
      }}
      className="cursor-pointer"
    >
      <FadeInAnimation>
        <div className="bg-white flex flex-col items-center justify-center rounded-lg shadow-lg h-64 w-64 p-1">
          <div className="flex bg-white rounded-t-lg shadow-lg w-full h-full items-center justify-center overflow-hidden">
            <img
              src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
              alt={hero.name}
              className="object-fill"
            />
          </div>
          <div className="bg-marvel-red text-white w-full p-1 rounded-b-lg h-10 flex items-center justify-center">
            <h2 className="text-center font-bold text-sm text-ellipsis break-words">
              {hero.name}
            </h2>
          </div>
        </div>
      </FadeInAnimation>
    </HoverScaleAnimation>
  );
};

export default HeroCard;
