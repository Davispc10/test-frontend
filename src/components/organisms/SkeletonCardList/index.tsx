import SkeletonCard from "@/components/molecules/skeletonCard/SkeletonCard";
import React from "react";

const SkeletonCardList = () => {
  return Array.from({ length: 20 }).map((_, i) => <SkeletonCard key={i} />);
};

export default SkeletonCardList;
