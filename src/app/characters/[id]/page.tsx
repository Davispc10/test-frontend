"use client";

import { Character, ResultComicsData } from "@/types/global";
import React, { useState, useEffect } from "react";
import { CardSuperHero } from "@/components";
import { fetchData, fetchDataComics } from "@/functions/functions";
import { timestamp } from "@/constants/constants";

interface Params {
  id: string;
}

export default function Character({ params }: { params: Params }) {
  const [character, setCharacter] = useState<Character | undefined>();
  const [comics, setComics] = useState<ResultComicsData[] | undefined>([]);

  useEffect(() => {
    fetchData({
      id: params.id,
      timestamp: timestamp,
    }).then((data) => setCharacter(data));
    fetchDataComics({
      id: params.id,
      timestamp: timestamp,
    }).then((data) => setComics(data));
  }, [params.id]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full py-5">
      {character?.thumbnail && (
        <CardSuperHero key={params.id} character={character} commics={comics} />
      )}
    </div>
  );
}
