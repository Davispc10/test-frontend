'use client';

import useDarkMode from '@/app/hooks/useDarkMode';
import { shimmer, toBase64 } from '@/utils';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsFillClipboard2HeartFill } from 'react-icons/bs';

import Button from '../ui/Button';
import CharacterSpecialIcon from './CharacaterSpecialIcon';
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
    <main className="flex items-center justify-center max-[1500px]:flex-col-reverse max-[1500px]:gap-y-10 min-[1500px]:mt-16">
      <div className="h-full w-full max-[1500px]:flex max-[1500px]:justify-center">
        <div
          className={`${characterContainerClasses} relative max-[540px]:w-full`}
        >
          <span className="bg-gray-600 p-1 font-extrabold text-white">
            {subName ?? '...'}
          </span>
          <h1 className="font-marvel text-[4rem] tracking-wide">{name}</h1>
          <div className="absolute right-[0.5em] top-[0.5em]">
            <CharacterSpecialIcon characterName={name} />
          </div>
          <p className="max-w-[550px] opacity-60">{description}</p>
          <div className="mt-5 flex max-[420px]:flex-col max-[420px]:space-y-4 min-[420px]:space-x-4">
            <div>
              <Button href="/">
                <AiOutlineArrowLeft />
                Return
              </Button>
            </div>
            <Button testid="share-btn" onClick={() => setIsOpen(true)}>
              <BsFillClipboard2HeartFill />
              Share character
            </Button>
          </div>
          <div className="mt-10">
            <CharacterComics comics={comics} />
          </div>
        </div>
      </div>
      <div className="h-full w-full animate-move max-[1500px]:max-w-[550px]">
        <div className="parallelogram flex h-full w-full justify-end max-[1500px]:justify-center">
          <Image
            src={
              image ||
              'https://res.cloudinary.com/domwy2hmn/image/upload/v1690702305/marvel-logo_o4rgqz.jpg'
            }
            alt="hero"
            width={500}
            height={500}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(300, 300)
            )}`}
          />
        </div>
      </div>
      <ShareModal
        isOpen={isOpen}
        image={image}
        name={name}
        onClose={() => setIsOpen(false)}
      />
    </main>
  );
}
