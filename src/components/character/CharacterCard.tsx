'use client';

import useDarkMode from '@/app/hooks/useDarkMode';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsFillClipboard2HeartFill } from 'react-icons/bs';

import Button from '../ui/Button';
import CharacterComics from './CharacterComics';
import ShareModal from './ShareModal';

interface CharacterCardProps {
  name: string;
  subName: string;
  description: string;
  image: string;
  comics: any[];
}

export default function CharacterCard({
  name,
  subName,
  description,
  image,
  comics,
}: CharacterCardProps) {
  const { characterContainerClasses } = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-center min-[1500px]:mt-16 max-[1500px]:flex-col-reverse max-[1500px]:gap-y-10">
      <div className="w-full h-full max-[1500px]:flex max-[1500px]:justify-center">
        <div className={`${characterContainerClasses} max-[540px]:w-full`}>
          <span className="bg-gray-600 p-1 font-extrabold text-white">
            {subName ?? '...'}
          </span>
          <h1 className="text-[4rem] font-marvel tracking-wide">{name}</h1>
          <p className="opacity-60 max-w-[550px]">{description}</p>
          <div className="flex min-[420px]:space-x-4 mt-5 max-[420px]:flex-col max-[420px]:space-y-4">
            <div>
              <Button href="/">
                <AiOutlineArrowLeft />
                Return
              </Button>
            </div>
            <Button onClick={() => setIsOpen(true)}>
              <BsFillClipboard2HeartFill />
              Share character
            </Button>
          </div>
          <div className="mt-10">
            <CharacterComics comics={comics} />
          </div>
        </div>
      </div>
      <div className="animate-move w-full h-full max-[1500px]:max-w-[550px]">
        <div className="w-full h-full parallelogram flex justify-end max-[1500px]:justify-center">
          <Image src={image ?? ''} alt="hero" width={550} height={825} />
        </div>
      </div>
      <ShareModal
        isOpen={isOpen}
        image={image}
        name={name}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
