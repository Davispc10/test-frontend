import MyContainer from "@/components/MyContainer";
import React from "react";
import BackIcon from "../BackIcon";

interface CharacterViewSkeletonProps {
  handleGoBack: () => void;
}

export default function CharacterViewSkeleton({
  handleGoBack,
}: CharacterViewSkeletonProps) {
  return (
    <MyContainer>
      {/* <button
        onClick={handleGoBack}
        className="flex gap-4 items-center mb-4 [&:hover>svg]:stroke-red-500 border-none"
      >
        <BackIcon />
        <p className="text-2xl">Back</p>
      </button> */}
      <div className="flex gap-4 max-md:flex-col">
        <div className="bg-slate-400 animate-pulse aspect-[11/16] max-w-[22rem] w-full" />

        <div className="flex flex-col py-8 w-full">
          <div className="bg-slate-400 animate-pulse h-20 max-w-[37rem] max-sm:h-16 mt-4" />

          <div className="bg-slate-400 animate-pulse h-8 mt-8 max-w-[40rem]" />

          <div className="bg-slate-400 animate-pulse h-6 max-w-[15rem] mt-8" />
          <div className="bg-slate-400 animate-pulse h-6 max-w-[20rem] mt-8" />
          <div className="bg-slate-400 animate-pulse h-6 max-w-[12rem] mt-8" />
          <div className="bg-slate-400 animate-pulse h-6 max-w-[16rem] mt-8" />
        </div>
      </div>
      <div className="animate-pulse overflow-hidden h-44 flex gap-4 max-w-7xl w-full mt-8">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-slate-400 animate-pulse aspect-[1/1.72] min-w-[100px] w-[100px] min-h-[172px]"
          />
        ))}
      </div>
    </MyContainer>
  );
}
