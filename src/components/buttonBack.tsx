"use client";

import { ChevronLeft } from "lucide-react";

export function ButtonBack() {
  return (
    <button
      className="w-[160px] mt-8 flex items-center text-white gap-2 rounded-lg py-2 px-4 border font-bold text-xl uppercase bg-red-600 hover:bg-red-700 transition-colors"
      onClick={() => window.history.back()}
    >
      <ChevronLeft size={24}/>
      Voltar
    </button>
  );
}
