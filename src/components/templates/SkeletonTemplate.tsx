import React from "react";
import SkeletonCardList from "../organisms/SkeletonCardList";

const SkeletonTemplate = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-wrap gap-6 justify-center">
        <SkeletonCardList />
      </div>
    </div>
  );
};

export default SkeletonTemplate;
