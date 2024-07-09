import { LoaderCircle } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex gap-2 justify-center items-center w-full text-lg min-h-screen bg-neutral-800 text-white">
      <span>Loading</span>
      <LoaderCircle className="animate-spin" />
    </div>
  );
};

export default Loading;
