"use client";
import { SelectedHeroReducer } from "@/types/heroes";
import Image from "next/image";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { BsArrowLeft } from "react-icons/bs";
import { useQuery } from "react-query";
import { HeroesServices } from "@/services/heroes.service";
import { useDispatch } from "react-redux";
import {
  setHero,
  setComics,
  setEvents,
  setSeries,
  setStories,
} from "@/redux/selectedHero/slice";
import PageDetailsSwitcher from "@/components/PageDetailsSwitcher";
import ComicsList from "@/components/ComicsList";
import SeriesList from "@/components/SeriesList";
import StoriesList from "@/components/StoriesList";
import EventsList from "@/components/EventsList";

type Props = {};

export type BtnOptions = "Comics" | "Séries" | "Eventos" | "Histórias";
export type Options = {
  id: string;
  name: BtnOptions;
  isSelected: boolean;
};

const HeroDetails = ({}: Props) => {
  const params = useSearchParams();
  const id = parseInt(params.get("id") as string, 10);
  const dispatch = useDispatch();

  const [selectedBtn, setSelectedBtn] = useState<BtnOptions>("Comics");

  const { selectedHero, comics, events, series, stories } = useSelector(
    (rootReducer: SelectedHeroReducer) => rootReducer.selectedHeroReducer
  );

  const [imageUrl, setImageUrl] = useState<string>(() => {
    if (!selectedHero.thumbnail || selectedHero.thumbnail.path.length < 1) {
      return "/_next/static/media/placeholder.43193f81.jpg";
    } else {
      return `${selectedHero.thumbnail.path}.${selectedHero.thumbnail.extension}`;
    }
  });

  const { isLoading, error } = useQuery(
    ["heroData"],
    async () => {
      const heroResponse = await HeroesServices.getHeroData(id);
      const comicsResponse = await HeroesServices.getHeroComics(id);
      const storiesResponse = await HeroesServices.getHeroStories(id);
      const eventsResponse = await HeroesServices.getHeroEvents(id);
      const seriesResponse = await HeroesServices.getHeroSeries(id);

      dispatch(setHero(heroResponse.data.data.results[0]));
      dispatch(setComics(comicsResponse.data));
      dispatch(setStories(storiesResponse.data));
      dispatch(setEvents(eventsResponse.data));
      dispatch(setSeries(seriesResponse.data));

      return {
        heroData: heroResponse.data.data.results[0],
        comics: comicsResponse.data,
        stories: storiesResponse.data,
        events: eventsResponse.data,
        series: seriesResponse.data,
      };
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const optionsArr = useMemo<Options[]>(() => {
    const optionNames: BtnOptions[] = [
      "Comics",
      "Eventos",
      "Histórias",
      "Séries",
    ];
    return optionNames.map((name, index) => ({
      id: `option-${index + 1}`,
      name,
      isSelected: selectedBtn === name,
    }));
  }, [selectedBtn]);

  const btnComponentMap: { [key in BtnOptions]: React.ReactElement } = {
    Comics: <ComicsList comics={comics?.data?.results} />,
    Eventos: <EventsList events={events?.data?.results} />,
    Histórias: <StoriesList stories={stories?.data?.results} />,
    Séries: <SeriesList series={series?.data?.results} />,
  };
  const selectedComponent = btnComponentMap[selectedBtn] || null;

  const handleClickSwitcher = (button: BtnOptions) => setSelectedBtn(button);

  useEffect(() => {
    if (String(params.get("id")).length < 1) {
      redirect("/");
    }
    if (selectedHero?.thumbnail?.path) {
      setImageUrl(
        `${selectedHero.thumbnail.path}.${selectedHero.thumbnail.extension}`
      );
    }
  }, [selectedHero]);

  return (
    <div className="p-8">
      <Link href="/" className="flex items-center gap-4">
        <BsArrowLeft size={30} />
        <p className="text-3xl">Voltar</p>
      </Link>

      <div className="flex gap-4">
        <Image
          src={imageUrl}
          alt={"Hero Thumbnail"}
          className="mb-4"
          width={300}
          height={400}
        />

        <div>
          <h1 className="text-3xl font-bold mb-4">{selectedHero?.name}</h1>
          <p className="mb-4">
            <strong>Descrição:</strong> {selectedHero?.description}
          </p>
        </div>
      </div>

      <PageDetailsSwitcher
        options={optionsArr}
        click={handleClickSwitcher as (button: string) => void}
      />
      {selectedComponent}
    </div>
  );
};

export default HeroDetails;
