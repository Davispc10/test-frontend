import { useRouter } from "next/navigation";

import Image from "../atoms/Image";

import { Character as CharacterProps } from "@/types/payload";

export interface Props {
  character: CharacterProps;
}

function CharacterCard({ character }: Props) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/${character.id}`)}
      className="group relative aspect-square w-full overflow-hidden rounded-md bg-red-500/25 ring-1 ring-red-500 transition-all after:absolute after:inset-0 after:h-full after:w-full after:bg-gradient-to-b after:from-[rgb(0,0,0,0)] after:to-black after:transition-all hover:ring-red-500/75 focus:ring-4"
    >
      <Image
        alt={character.name}
        height={256}
        priority
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        width={256}
        className="relative h-full w-full object-cover object-left"
      />
      <span className="absolute bottom-4 left-0 right-0 z-10 w-full px-4 text-center font-roboto text-lg font-bold uppercase text-white transition-colors group-hover:text-red-500">
        {character.name}
      </span>
    </button>
  );
}

export default CharacterCard;
