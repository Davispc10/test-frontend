import { Series } from "@/types/series";
import Image from "next/image";
import React from "react";

type Props = {
  series: Series[];
};

const SeriesList = ({ series }: Props) => {
  if (!series) {
    return null;
  }

  const renderSeriesImage = (series: Series) => {
    return (
      <div
        className="w-[250px] h-[300px] bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${series.thumbnail.path}.${series.thumbnail.extension})`,
        }}
      />
    );
  };

  return (
    <section className="flex gap-6 flex-wrap items-center justify-between">
      {series.map((series) => renderSeriesImage(series))}
    </section>
  );
};

export default SeriesList;
