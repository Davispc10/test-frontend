import SkeletonThumbCharacter from "@/components/atoms/skeleton/SkeletonThumbCharacter";
import SkeletonCharacterInfos from "@/components/molecules/skeletonCharacterInfos/SkeletonCharacterDetail";
import React from "react";

const SkeletonCharacterDetail = () => {
  return (
    <div className="flex flex-wrap-reverse justify-between gap-8">
      <SkeletonCharacterInfos />

      <SkeletonThumbCharacter />
    </div>
  );
};

export default SkeletonCharacterDetail;
