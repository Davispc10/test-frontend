"use client";

import { Character } from "@/types/global";
import React, { useEffect, useContext } from "react";
import { CardSuperHero } from "@/components";
import { fetchData, fetchDataComics } from "@/functions/functions";
import { timestamp } from "@/constants/constants";
import { Context } from "@/context/contextApi";
import Loading from "@/components/Loading";

interface Params {
  id: string;
}

export default function Character({ params }: { params: Params }) {
  const { comics, setComics, singleCharacter, setSingleCharacter } =
    useContext(Context);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetchData({
      id: params.id,
      timestamp: timestamp,
    }).then((data) => setSingleCharacter(data));
    fetchDataComics({
      id: params.id,
      timestamp: timestamp,
    }).then((data) => setComics(data));

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-40">
        <div className="h-40">
          <Loading />
        </div>
        <div className="flex flex-row gap-2 py-40 justify-center items-center flex-wrap max-w-3xl w-full">
          {comics.map((comic, index) => (
            <div key={index} className=" hover:scale-105">
              <Loading />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-full py-5">
      {singleCharacter?.thumbnail && (
        <CardSuperHero
          key={params.id}
          character={singleCharacter}
          commics={comics}
        />
      )}
    </div>
  );
}
