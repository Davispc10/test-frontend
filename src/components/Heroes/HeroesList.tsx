import React, { FC } from 'react';
import { HeroCard } from './HeroCard';
import { HeroProps } from '../../utils/interfaces';
import Link from 'next/link';

const HeroesList: FC<HeroProps> = ({ ...props }) => {
  return (
    <div className='hover:bg-red-600 rounded-lg duration-300'>      
      <Link
        className="w-full h-full"
        href={`/hero/${props.id}`}
        key={props.id}
      >
        <HeroCard
          name={props.name}
          image={props.thumbnail!.path}
          id={props.id}
          className="w-full h-full flex flex-col justify-start xl:justify-around items-center p-1 my-1"
        />
      </Link>      
    </div>
  );
};

export default HeroesList;





