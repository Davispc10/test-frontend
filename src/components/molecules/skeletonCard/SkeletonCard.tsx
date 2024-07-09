import SkeletonButtonCard from "@/components/atoms/skeletonCard/SkeletonButtonCard";
import SkeletonDescriptionCard from "@/components/atoms/skeletonCard/SkeletonButtonCard";
import SkeletonLogoCard from "@/components/atoms/skeletonCard/SkeletonLogoCard";
import SkeletonNameCard from "@/components/atoms/skeletonCard/SkeletonNameCard";
import React from "react";

const SkeletonCard = () => {
  return (
    <div className="w-80 bg-neutral-800 p-4 flex gap-4 flex-col items-center rounded cursor-default">
      <SkeletonLogoCard />
      <SkeletonNameCard />
      <SkeletonButtonCard />
    </div>
  );
};

export default SkeletonCard;
