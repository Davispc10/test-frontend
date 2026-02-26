"use client";

import { useState, useRef, useEffect } from "react";
import { Filter, X, Check, SlidersHorizontal } from "lucide-react";
import { useMarvelStore } from "@/lib/store";
import { typeIcons } from "@/lib/type-icons";
import { typeClasses } from "@/lib/pokemon-types";
import { cn } from "@/lib/utils";
import { REGIONS } from "@/lib/pokemon-api";

const POKEMON_TYPES = [
    "Normal", "Fighting", "Flying", "Poison", "Ground", "Rock",
    "Bug", "Ghost", "Steel", "Fire", "Water", "Grass",
    "Electric", "Psychic", "Ice", "Dragon", "Dark", "Fairy"
];


export function SearchFilters() {
    const [isOpen, setIsOpen] = useState(false);
    const {
        minId, maxId, typeFilters, rarityFilter,
        setRegion, setTypeFilter, setRarityFilter, resetFilters
    } = useMarvelStore();
    const popoverRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const activeRegion = REGIONS.find(r => r.min === minId && r.max === maxId);



    return (
        <div className="relative" ref={popoverRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-3 rounded-2xl border h-16 w-16 flex items-center justify-center transition-all duration-300 cursor-pointer
                    ${isOpen
                        ? 'bg-red-600 border-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                        : typeFilters.length > 0 || activeRegion
                            ? 'bg-red-500/20 border-red-500/40 text-red-500'
                            : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white'
                    }`}
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <SlidersHorizontal className="w-6 h-6" />
                )}
            </button>

            {isOpen && (
                <div className="absolute z-50 right-0 top-full mt-2 w-[320px] sm:w-[380px] bg-[#111] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[60vh]">
                    <div className="p-4 border-b border-white/10 flex items-center justify-center bg-white/5">
                        <div className="flex items-center gap-2 text-white">
                            <Filter className="w-4 h-4 text-red-500" />
                            <h3 className="text-sm font-black uppercase tracking-widest">Filtros Avançados</h3>
                        </div>
                    </div>

                    <div className="overflow-y-auto p-5 space-y-8 flex-1 custom-scrollbar">
                        {/* Types Filter */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                                <div className="w-1 h-3 bg-red-500 rounded-full" />
                                Tipo de Pokémon
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => {
                                        resetFilters();
                                    }}
                                    className={`px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer
                                        ${typeFilters.length === 0 && !activeRegion && rarityFilter === null
                                            ? 'bg-white text-black border-white'
                                            : 'bg-transparent border-white/20 text-white/50 hover:border-white/40'
                                        }`}
                                >
                                    Todos
                                </button>
                                {POKEMON_TYPES.map(type => {
                                    const isSelected = typeFilters.includes(type);
                                    const typeKey = type.toLowerCase();
                                    return (
                                        <button
                                            key={type}
                                            onClick={() => setTypeFilter(type)}
                                            className={cn(
                                                "flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all duration-300 relative overflow-hidden group cursor-pointer",
                                                isSelected
                                                    ? cn(typeClasses[typeKey], "border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105 z-10")
                                                    : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:border-white/25 hover:text-white"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "w-3.5 h-3.5 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                                                    isSelected ? "brightness-200" : "opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100"
                                                )}
                                                dangerouslySetInnerHTML={{ __html: typeIcons[typeKey] || "" }}
                                            />
                                            <span className={cn(isSelected ? "text-white" : "text-inherit")}>
                                                {type}
                                            </span>
                                            {isSelected && (
                                                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white opacity-50" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Rarity Filter */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                                <div className="w-1 h-3 bg-yellow-500 rounded-full" />
                                Raridade & Categoria
                            </h4>
                            <div className="flex flex-col gap-2 relative">
                                {[
                                    { id: "legendary" as const, name: "Lendários", color: "from-yellow-400 to-yellow-600", borderColor: "border-yellow-500", shadowItem: "shadow-[0_0_15px_rgba(234,179,8,0.4)]" },
                                    { id: "mythical" as const, name: "Míticos", color: "from-pink-400 to-purple-500", borderColor: "border-pink-500", shadowItem: "shadow-[0_0_15px_rgba(236,72,153,0.4)]" },
                                    { id: "ultrabeast" as const, name: "Ultra Beasts", color: "from-blue-400 to-indigo-600", borderColor: "border-indigo-400", shadowItem: "shadow-[0_0_15px_rgba(99,102,241,0.4)]" },
                                ].map(rarity => {
                                    const isSelected = rarityFilter === rarity.id;
                                    return (
                                        <button
                                            key={rarity.id}
                                            onClick={() => setRarityFilter(rarity.id)}
                                            className={`relative flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300 text-xs font-black uppercase tracking-widest overflow-hidden group cursor-pointer
                                                ${isSelected
                                                    ? `bg-white/10 ${rarity.borderColor} text-white ${rarity.shadowItem} scale-[1.02]`
                                                    : 'bg-transparent border-white/5 text-white/40 hover:bg-white/5 hover:border-white/20 hover:text-white/80'
                                                }`}
                                        >
                                            {isSelected && (
                                                <div className={`absolute inset-0 bg-gradient-to-r ${rarity.color} opacity-20`} />
                                            )}
                                            <div className="relative z-10 flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white shadow-[0_0_10px_white]' : 'bg-white/20 group-hover:bg-white/50 transition-colors'}`} />
                                                <span className={isSelected ? `text-transparent bg-clip-text bg-gradient-to-r ${rarity.color} drop-shadow-sm` : ''}>
                                                    {rarity.name}
                                                </span>
                                            </div>
                                            {isSelected && <Check className="w-4 h-4 text-white relative z-10" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Regions Filter */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                                <div className="w-1 h-3 bg-blue-500 rounded-full" />
                                Região (Geração)
                            </h4>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => setRegion(undefined, undefined)}
                                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl border transition-all text-xs font-bold uppercase tracking-widest cursor-pointer
                                        ${!activeRegion
                                            ? 'bg-white/10 border-white/20 text-white'
                                            : 'bg-transparent border-white/5 text-white/40 hover:bg-white/5 hover:text-white/80'
                                        }`}
                                >
                                    <span>Todas as Regiões</span>
                                    {!activeRegion && <Check className="w-4 h-4 text-white" />}
                                </button>

                                {REGIONS.map(region => {
                                    const isSelected = activeRegion?.name === region.name;
                                    return (
                                        <button
                                            key={region.name}
                                            onClick={() => setRegion(isSelected ? undefined : region.min, isSelected ? undefined : region.max)}
                                            className={`flex items-center justify-between px-4 py-2.5 rounded-xl border transition-all text-xs font-bold uppercase tracking-widest group cursor-pointer
                                                ${isSelected
                                                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                                    : 'bg-transparent border-white/5 text-white/40 hover:bg-white/10 hover:border-white/20 hover:text-white/80'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span>{region.name}</span>
                                                <span className={`text-[9px] px-2 py-0.5 rounded-full transition-colors ${isSelected ? 'bg-blue-500/30' : 'bg-white/5 group-hover:bg-white/10'}`}>
                                                    #{region.min} - #{region.max}
                                                </span>
                                            </div>
                                            {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t border-white/10 bg-black/50">
                        <button
                            onClick={() => {
                                resetFilters();
                            }}
                            className="w-full py-3 rounded-xl bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 hover:text-red-400 text-white/50 text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
                        >
                            Limpar Filtros
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
