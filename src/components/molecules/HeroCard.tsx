import React from 'react';
import { HeroPicture } from '../atoms/HeroPicture';
import { HeroName } from '../atoms/HeroName';

interface HeroCardProps {
  name: string,
  image: string,
  textSize?: string,
}

const HeroCard = ({ ...props }: HeroCardProps) => {
  return (  
    <div className="w-full flex flex-col justify-start xl:justify-around items-center p-1 my-1">
      <HeroPicture source={props.image!} />
      <HeroName name={props.name} textSize={props.textSize}/>
    </div>
  );
};

export default HeroCard;





