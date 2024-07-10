import SkeletonDescriptionComic from "@/components/atoms/skeleton/SkeletonDescriptionComic";
import SkeletonNameCard from "@/components/atoms/skeleton/SkeletonNameCard";
import React from "react";

const SkeletonCharacterInfos = () => {
  return (
    <div className="basis-96 flex-grow">
      <SkeletonNameCard />
      <SkeletonDescriptionComic />
    </div>
  );
};

export default SkeletonCharacterInfos;
