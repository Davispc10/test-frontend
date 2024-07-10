import React from "react";

const SkeletonThumbCharacter = () => {
  return (
    <div className="rounded-md flex-grow md:flex-grow-0  basis-[300px] md:max-w-[500px] bg-slate-300 animate-pulse aspect-square object-cover" />
  );
};

export default SkeletonThumbCharacter;
