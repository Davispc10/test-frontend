import Link from "next/link";

import Image from "../atoms/Image";
import ReferencesList from "./ReferencesList";

import {
  Character as CharacterProps,
  Reference as ReferenceProps,
} from "@/types/payload";

import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

export interface Props {
  character: CharacterProps;
  comics: ReferenceProps[];
  events: ReferenceProps[];
  series: ReferenceProps[];
  stories: ReferenceProps[];
}

function CharacterProfile({
  character,
  comics,
  events,
  series,
  stories,
}: Props) {
  return (
    <>
      <div className="flex flex-shrink-0 flex-col-reverse gap-4 overflow-hidden p-8 md:flex-col">
        <div className="h-32 w-full md:h-64 md:w-64">
          <Image
            alt={character.name}
            priority
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            fill
            className="relative h-full w-full rounded-md object-cover object-center ring-1 ring-red-500"
          />
        </div>
        <div className="flex flex-row gap-2 md:flex-col">
          {character.urls.map((url, index) => (
            <div
              key={index}
              className="group flex w-fit items-center gap-1 transition-colors"
            >
              <Link
                key={url.type}
                href={url.url}
                rel="noreferrer"
                target="_blank"
                className="font-roboto text-sm font-bold uppercase text-red-500 transition-colors hover:text-red-500/75"
              >
                {url.type}
              </Link>
              <ArrowUpRightIcon className="hidden w-0 -translate-x-1 -translate-y-px stroke-[4px] text-red-500/75 opacity-0 transition-all group-hover:w-2 group-hover:translate-x-0 group-hover:opacity-100 sm:block" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col justify-between gap-4 overflow-hidden p-8 pt-0 md:pt-8">
        <div className="flex flex-col border-b border-black/10 pb-4">
          <span className="text-roboto text-2xl font-bold uppercase text-red-500">
            {character.name}
          </span>
          <p className="text-sm text-black/75">{character.description}</p>
        </div>
        {character.comics.available !== 0 && (
          <div className="flex w-full flex-col gap-4">
            <span className="text-sm text-black/75">
              Aparece em {character.comics.available}{" "}
              {character.comics.available === 1 ? "quadrinho" : "quadrinhos"}.
            </span>
            <ReferencesList {...{ references: comics }} />
          </div>
        )}
        {character.events.available !== 0 && (
          <div className="flex w-full flex-col gap-4">
            <span className="text-sm text-black/75">
              Aparece em {character.events.available}{" "}
              {character.events.available === 1 ? "evento" : "eventos"}.
            </span>
            <ReferencesList {...{ references: events }} />
          </div>
        )}
        {character.series.available !== 0 && (
          <div className="flex w-full flex-col gap-4">
            <span className="text-sm text-black/75">
              Aparece em {character.series.available} séries.
            </span>
            <ReferencesList {...{ references: series }} />
          </div>
        )}
        {character.stories.available !== 0 && (
          <div className="flex w-full flex-col gap-4">
            <span className="text-sm text-black/75">
              Aparece em {character.stories.available}{" "}
              {character.stories.available === 1 ? "história" : "histórias"}.
            </span>
            <ReferencesList {...{ references: stories }} />
          </div>
        )}
      </div>
    </>
  );
}

export default CharacterProfile;
