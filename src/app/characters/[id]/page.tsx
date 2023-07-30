import { ButtonBack } from "@/components/buttonBack";
import { Carousel } from "@/components/carousel";
import { getCharacter } from "@/lib/marvel";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Character({ params }: PageProps) {
  const character = await getCharacter(params.id);

  return (
    <div className="flex sm:flex-col-reverse relative">
      <div className="flex-1 sm:flex-none flex flex-col gap-2 h-[88vh] sm:h-auto justify-center sm:justify-start p-16 sm:py-8 relative">
        <h1 className="text-3xl font-bold">{character.name}</h1>
        <span className="text-lg">{character.description}</span>
        <ButtonBack />
      </div>
      <div className="flex h-[88vh] sm:h-auto justify-center items-center relative">
        <div className="sm:invisible z-[1] absolute top-0 left-0 bottom-0 w-52 bg-gradient-to-r from-zinc-900 to-transparent" />
        <div className="z-[1] absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-zinc-900 to-transparent" />
        <Carousel images={character.images} />
        <div className="z-[1] absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-900 to-transparent" />
      </div>
    </div>
  );
}
