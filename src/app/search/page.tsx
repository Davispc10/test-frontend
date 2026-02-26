"use client";

import React from "react";
import { SearchBar } from "@/components/search-bar";
import { CharacterList } from "@/components/character-list";
import { Filter, SlidersHorizontal, Trash2, X, ChevronLeft } from "lucide-react";
import { useMarvelStore } from "@/lib/store";
import { SearchFilters } from "@/components/search-filters";
import { useRouter } from "next/navigation";
import { typeIcons } from "@/lib/type-icons";
import { typeClasses } from "@/lib/pokemon-types";
import { cn } from "@/lib/utils";

export default function SearchPage() {
    const router = useRouter();
    const { minId, maxId, typeFilters, rarityFilter, resetFilters, setRegion, setTypeFilter, setRarityFilter } = useMarvelStore();

    const getActiveRegion = () => {
        if (minId === 1 && maxId === 151) return "kanto";
        if (minId === 152 && maxId === 251) return "johto";
        if (minId === 252 && maxId === 386) return "hoenn";
        if (minId === 387 && maxId === 493) return "sinnoh";
        if (minId === 494 && maxId === 649) return "unova";
        if (minId === 650 && maxId === 721) return "kalos";
        if (minId === 722 && maxId === 809) return "alola";
        if (minId === 810 && maxId === 898) return "galar";
        if (minId === 899 && maxId === 1025) return "paldea";
        return undefined;
    };

    const rarityLabels = {
        legendary: { name: "Lendário", bg: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20 hover:text-yellow-300" },
        mythical: { name: "Mítico", bg: "bg-pink-500/10 border-pink-500/20 text-pink-400 hover:bg-pink-500/20 hover:text-pink-300" },
        ultrabeast: { name: "Ultra Beast", bg: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 hover:text-indigo-300" }
    } as const;

    return (
        <main className="min-h-screen bg-[#080808] text-white p-4 sm:p-6 md:p-12 pb-32">
            <div className="max-w-7xl mx-auto space-y-6 sm:space-y-12">
                <header className="space-y-4 sm:space-y-6 relative z-50">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <button
                            onClick={() => router.push("/")}
                            className="p-1.5 sm:p-2 hover:bg-white/10 rounded-xl border border-white/5 transition-colors group cursor-pointer"
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white/50 group-hover:text-white transition-colors" />
                        </button>
                        <h1 className="text-2xl sm:text-4xl font-black italic tracking-tighter uppercase whitespace-normal break-words">Busca Pokémon</h1>
                    </div>

                    <div className="flex gap-4 items-center w-full">
                        <div className="flex-1">
                            <SearchBar />
                        </div>
                        <SearchFilters />

                    </div>

                    {/* Filtros Ativos e Botão de Reset */}
                    {(getActiveRegion() || typeFilters.length > 0 || rarityFilter) && (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                            <div className="flex flex-wrap gap-2">
                                {typeFilters.map((type) => (
                                    <div
                                        key={type}
                                        className={cn(
                                            "flex items-center gap-2 px-3 py-1.5 border border-white/5 rounded-full text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-lg transition-all",
                                            typeClasses[type.toLowerCase()]
                                        )}
                                    >
                                        <div
                                            className="w-3.5 h-3.5 flex items-center justify-center shrink-0 brightness-150"
                                            dangerouslySetInnerHTML={{ __html: typeIcons[type.toLowerCase()] || "" }}
                                        />
                                        <span>{type}</span>
                                        <button
                                            onClick={() => setTypeFilter(type)}
                                            className="hover:bg-black/20 p-0.5 rounded-full transition-colors flex items-center justify-center cursor-pointer"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}

                                {rarityFilter && (
                                    <div className={cn(
                                        "flex items-center gap-2 px-3 py-1.5 border rounded-full text-[10px] font-bold uppercase tracking-widest transition-all",
                                        rarityLabels[rarityFilter]?.bg
                                    )}>
                                        <span className="drop-shadow-sm">{rarityLabels[rarityFilter]?.name}</span>
                                        <button onClick={() => setRarityFilter(null)} className="hover:bg-black/20 p-0.5 rounded-full transition-colors flex items-center justify-center cursor-pointer">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                )}

                                {getActiveRegion() && (
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                                        <span>Região: {getActiveRegion()}</span>
                                        <button onClick={() => setRegion(undefined, undefined)} className="hover:bg-blue-500/20 hover:text-blue-300 p-1 rounded-full transition-colors flex items-center justify-center cursor-pointer">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => resetFilters()}
                                className="flex justify-center items-center gap-2 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-500 transition-all shrink-0 cursor-pointer"
                            >
                                <Trash2 className="w-4 h-4" />
                                Reset Filters
                            </button>
                        </div>
                    )}
                </header>

                <CharacterList />
            </div>

            {/* Ambient Effects */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-red-600/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-blue-600/5 blur-[100px] rounded-full" />
            </div>
        </main>
    );
}
