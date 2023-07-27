'use client';

import CharacterComics from './CharacterComics';
import Button from '../ui/Button';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsFillClipboard2HeartFill } from 'react-icons/bs';
import Image from 'next/image';
import useDarkMode from '@/app/hooks/useDarkMode';

export default function CharacterCard() {
  const { characterContainerClasses } = useDarkMode();

  return (
    <div className="flex items-center justify-center min-[1500px]:mt-20 max-[1500px]:flex-col-reverse max-[1500px]:gap-y-10">
      <div className="w-full h-full max-[1500px]:flex max-[1500px]:justify-center">
        <div className={`${characterContainerClasses} max-[540px]:w-full`}>
          <span className="bg-gray-600 p-1 font-extrabold text-white">
            CABLE
          </span>
          <h1 className="text-[4rem] font-marvel tracking-wide">CABLE</h1>
          <p className="opacity-60 max-w-[550px]">
            Cable, aka Nathan Summers, is a powerful mutant from Marvel Comics
            with a convoluted past. He is a gruff warrior from the future, armed
            with advanced tech, telepathy, and telekinesis, fighting to prevent
            an apocalyptic future and protect mutantkind.
          </p>
          <div className="flex min-[420px]:space-x-4 mt-5 max-[420px]:flex-col max-[420px]:space-y-4">
            <Button href="/">
              Return
              <AiOutlineArrowLeft />
            </Button>
            <Button>
              Share character
              <BsFillClipboard2HeartFill />
            </Button>
          </div>
          <div className="mt-10">
            <CharacterComics />
          </div>
        </div>
      </div>
      <div className="hero-container w-full h-full max-[1500px]:max-w-[550px]">
        <div className="w-full h-full parallelogram flex justify-end max-[1500px]:justify-center">
          <Image
            src="http://i.annihil.us/u/prod/marvel/i/mg/f/50/5239c22332b00.jpg"
            alt="hero"
            className="min-[1500px]:w-[95%] object-cover"
            width={550}
            height={825}
          />
        </div>
      </div>
    </div>
  );
}
