'use client';

import useDarkMode from '@/app/hooks/useDarkMode';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface CharacterListCardProps {
  characters: any;
  offset?: number;
}

export default function CharacterListCards({
  characters,
  offset,
}: CharacterListCardProps) {
  const { colorClasses } = useDarkMode();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchoffset = searchParams.get('searchoffset');
  const character = searchParams.get('character');

  if (characters?.length === 0) {
    return (
      <div className="flex h-[650px] w-full items-center justify-center">
        <h2 className="font-marvel text-2xl font-extrabold tracking-wider">
          No results found
        </h2>
      </div>
    );
  }

  return (
    <section
      className={`mb-2 mt-5 flex h-[650px] w-full flex-wrap items-center justify-center gap-2 pt-2 max-[1160px]:h-auto max-[1160px]:max-w-[700px] max-[1160px]:flex-nowrap max-[1160px]:justify-start max-[1160px]:overflow-x-scroll max-[1160px]:rounded-xl max-[1160px]:bg-white max-[1160px]:px-2 max-[1160px]:pb-8`}
    >
      {characters?.map((item: any) => (
        <div
          data-testid="character-card"
          className={`${colorClasses} bnw-filter group h-[190px] w-[150px] cursor-pointer hover:z-10 hover:scale-125`}
          key={item?.id}
          onClick={() =>
            router.push(
              character
                ? `/character/${item?.id}?offset=${
                    offset ?? searchoffset
                  }&character=${character}`
                : `/character/${item?.id}?offset=${offset}`
            )
          }
        >
          <div className="h-[150px] w-full max-[1160px]:w-[150px]">
            <Image
              src={item?.image}
              alt="dare"
              className="h-full w-full object-fill"
              width={150}
              height={150}
            />
          </div>
          <div className="absolute inset-0 mb-5 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
            <h3 className="stroke-details font-extrabold text-white">
              Check details
            </h3>
          </div>
          <div className="flex h-[40px] items-center justify-center text-center">
            <h2 className="font-marvel text-xs font-extrabold tracking-widest">
              {item?.name}
            </h2>
          </div>
        </div>
      ))}
    </section>
  );
}
