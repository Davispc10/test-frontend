"use client";

import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import Button from "@/components/atoms/Button";
import CharacterProfile from "@/components/organisms/CharacterProfile";
import Spinner from "@/components/atoms/Spinner";

import { CharactersContext } from "@/context/CharactersProvider";

import { Character } from "@/entities/Character";
import { Comic } from "@/entities/Comic";
import { Event } from "@/entities/Event";
import { Series } from "@/entities/Series";
import { Story } from "@/entities/Story";

import {
  Character as CharacterProps,
  Reference as ReferenceProps,
} from "@/types/payload";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function CharacterPage() {
  const router = useRouter();

  const params = useParams();
  const id = parseInt((params.id as string) ?? "");

  const {
    getCharacter,
    getCharacterComics,
    getCharacterEvents,
    getCharacterSeries,
    getCharacterStories,
    loadingGetCharacter,
    loadingGetCharacterComics,
    loadingGetCharacterEvents,
    loadingGetCharacterSeries,
    loadingGetCharacterStories,
  } = useContext(CharactersContext);

  const [character, setCharacter] = useState<CharacterProps | null>(null);
  const [comics, setComics] = useState<ReferenceProps[]>([]);
  const [events, setEvents] = useState<ReferenceProps[]>([]);
  const [series, setSeries] = useState<ReferenceProps[]>([]);
  const [stories, setStories] = useState<ReferenceProps[]>([]);

  useEffect(() => {
    (async () => {
      if (!id) {
        return;
      }

      const characterPayload = await getCharacter(id);

      if (!characterPayload) {
        return;
      }

      setCharacter(new Character(characterPayload.data.results[0]));

      const comicsPayload = await getCharacterComics(id);

      if (!comicsPayload) {
        return;
      }

      setComics(comicsPayload.data.results.map((comic) => new Comic(comic)));

      const eventsPayload = await getCharacterEvents(id);

      if (!eventsPayload) {
        return;
      }

      setEvents(eventsPayload.data.results.map((event) => new Event(event)));

      const seriesPayload = await getCharacterSeries(id);

      if (!seriesPayload) {
        return;
      }

      setSeries(seriesPayload.data.results.map((series) => new Series(series)));

      const storiesPayload = await getCharacterStories(id);

      if (!storiesPayload) {
        return;
      }

      setStories(storiesPayload.data.results.map((story) => new Story(story)));
    })();

    return;
  }, [id]);

  const loading = useMemo(
    () =>
      loadingGetCharacter ||
      loadingGetCharacterComics ||
      loadingGetCharacterEvents ||
      loadingGetCharacterSeries ||
      loadingGetCharacterStories,
    [
      loadingGetCharacter,
      loadingGetCharacterComics,
      loadingGetCharacterEvents,
      loadingGetCharacterSeries,
      loadingGetCharacterStories,
    ]
  );

  const navigateBack = useCallback(() => {
    router.back();
  }, []);

  return (
    <>
      <header className="flex w-full flex-col gap-16">
        <Link
          href="/"
          className="w-fit rounded-md bg-[#ed1d24] p-1 ring-1 ring-red-500 transition-all hover:ring-red-500/75 focus:ring-4"
        >
          <NextImage alt="Marvel" height={32} src="/logo.png" width={32} />
        </Link>
        <Button icon={<ArrowLeftIcon />} onClick={navigateBack} type="button">
          Voltar
        </Button>
      </header>
      <main className="flex min-h-[512px] w-full flex-col rounded-md bg-white ring-1 ring-red-500 md:flex-row">
        {character ? (
          <CharacterProfile
            {...{
              character,
              comics,
              events,
              series,
              stories,
            }}
          />
        ) : loading ? (
          <div className="m-auto flex gap-2">
            <span className="flex h-3 w-3">
              <Spinner primary="fill-red-500" />
            </span>
            <span className="text-roboto text-xs font-bold text-red-500/75">
              Carregando personagem...
            </span>
          </div>
        ) : (
          <div className="m-auto flex">
            <span className="text-roboto text-xs font-bold text-red-500/75">
              Não foi possível encontrar o personagem.
            </span>
          </div>
        )}
      </main>
    </>
  );
}

export default CharacterPage;
