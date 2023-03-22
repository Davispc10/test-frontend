import { Hero } from '@/features/heroes';

const HeroCard = ({ hero }: { hero: Hero }) => {
  return (
    <div className="bg-white flex flex-col items-center justify-center rounded-lg shadow-lg h-64 w-64 p-1 gap-2">
      <div className="flex w-full h-full bg-white rounded-lg shadow-lg items-center justify-center overflow-hidden">
        <img
          src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
          alt={hero.name}
          className="object-fill"
        />
      </div>
      <div className="bg-marvel-red text-white w-full p-1 rounded-lg">
        <h2 className="text-center font-bold text-sm">{hero.name}</h2>
      </div>
    </div>
  );
};

export default HeroCard;
