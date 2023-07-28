import React from "react";
import { Marvel } from "next/font/google";

const marvel = Marvel({ subsets: ["latin"], weight: "400" });

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="border-4 border-solid bg-red-600 border-red-300 border-t-4 rounded-full animate-spin flex flex-col justify-center items-center p-5 w-24 h-24">
        <p className="text-3xl text-gray-50 font-extrabold text-center">M</p>
      </div>
    </div>
  );
}
