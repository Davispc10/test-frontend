import React, { FC } from 'react';
import { HeroProps } from '../../utils/interfaces';
import Link from 'next/link';
import { HeroPicture } from '../atoms/HeroPicture';
import { HeroName } from '../atoms/HeroName';

const HeroesCard: FC<HeroProps> = ({ ...props }) => {
  return (
    <Link 
      className='hover:bg-red-600 border-y border-red-900 rounded-lg duration-300'
      href={`/hero/${props.id}`}
      key={props.id}>      
        <div className="w-full h-full flex flex-col justify-start xl:justify-around items-center p-1 my-1">
          <HeroPicture source={props.thumbnail?.path} />
          <HeroName name={props.name} />
        </div>
    </Link>
  );
};

export default HeroesCard;





