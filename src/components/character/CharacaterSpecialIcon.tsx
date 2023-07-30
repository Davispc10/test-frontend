import Image from 'next/image';
import React from 'react';
import { GiGauntlet } from 'react-icons/gi';

interface CharacterSpecialIconProps {
  characterName: string;
}

export default function CharacterSpecialIcon({
  characterName,
}: CharacterSpecialIconProps) {
  switch (true) {
    case characterName.includes('Spider'):
      return (
        <Image
          src="https://res.cloudinary.com/domwy2hmn/image/upload/v1690752207/web-icon_ydrxx2.png"
          alt="spider"
          width={60}
          height={60}
          className="rounded-full"
        />
      );
    case characterName.includes('Iron Man'):
      return (
        <Image
          src="https://res.cloudinary.com/domwy2hmn/image/upload/v1690755128/iron-man_hpr2hf.png"
          alt="iron"
          width={60}
          height={60}
          className="rounded-full"
        />
      );
    case characterName.includes('Captain America'):
      return (
        <Image
          src="https://res.cloudinary.com/domwy2hmn/image/upload/v1690756394/captain-shield-icon_y4pzlr.png"
          alt="cap"
          width={60}
          height={60}
          className="rounded-full"
        />
      );
    case characterName.includes('Thor'):
      return (
        <Image
          src="https://res.cloudinary.com/domwy2hmn/image/upload/v1690752207/thor-icon.png"
          alt="thor"
          width={60}
          height={60}
          className="rounded-full"
        />
      );
    case characterName.includes('Thanos'):
      return <GiGauntlet className="text-[3rem] text-yellow-500" />;
    case characterName.includes('Captain Marvel'):
      return (
        <Image
          src="https://res.cloudinary.com/domwy2hmn/image/upload/v1690755190/captain-marvel_nfcv1d.jpg"
          alt="captain marvel"
          width={60}
          height={60}
          className="rounded-full"
        />
      );
    case characterName.includes('Magneto'):
      return (
        <Image
          src="https://res.cloudinary.com/domwy2hmn/image/upload/v1690755190/magneto-icon_lj68nv.png"
          alt="magneto"
          width={60}
          height={60}
          className="rounded-full"
        />
      );
    case characterName.includes('Wolverine'):
      return (
        <Image
          src="https://res.cloudinary.com/domwy2hmn/image/upload/v1690755190/wolverine-icon_su9zpx.png"
          alt="wolverine"
          width={60}
          height={60}
          className="rounded-full"
        />
      );
    case characterName.includes('Deadpool'):
      return (
        <Image
          src="https://res.cloudinary.com/domwy2hmn/image/upload/v1690755190/deadpool-icon_m9ru0e.png"
          alt="deadpool"
          width={60}
          height={60}
          className="rounded-full"
        />
      );
    default:
      return null;
  }
}
