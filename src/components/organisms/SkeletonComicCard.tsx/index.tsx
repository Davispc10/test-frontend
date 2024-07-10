import SkeletonCard from "@/components/molecules/skeletonCard/SkeletonCard";
import SkeletonComicCard from "@/components/molecules/skeletonComicCard/SkeletonComicCard";
import React from "react";

const SkeletonComicCardList = () => {
  return (
    <div className="flex justify-center flex-wrap gap-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <SkeletonComicCard key={i} />
      ))}
    </div>
  );
};

export default SkeletonComicCardList;
