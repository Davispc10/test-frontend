import React from "react";
import { HeroDetails } from "../organisms/HeroDetails";

interface HeroDetailsTemplateProps {
  thumbnail : {
    path: string
  },
  name: string,
  description: string,
  id: number,
}

export const HeroDetailsTemplate = ({ ...props }: HeroDetailsTemplateProps) => {
  return (
    <HeroDetails 
      name={props.name} 
      description={props.description!} 
      image={props.thumbnail.path}
      id={props.id}    
    />
  );
};
