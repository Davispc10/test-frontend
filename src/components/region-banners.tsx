"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Region {
    id: string;
    name: string;
    gen: string;
    minId: number;
    maxId: number;
    starters: number[];
    color: string;
}

const regions: Region[] = [
    {
        id: "kanto",
        name: "Kanto",
        gen: "1",
        minId: 1,
        maxId: 151,
        starters: [1, 4, 7],
        color: "#4ade80",
    },
    {
        id: "johto",
        name: "Johto",
        gen: "2",
        minId: 152,
        maxId: 251,
        starters: [152, 155, 158],
        color: "#fb923c",
    },
    {
        id: "hoenn",
        name: "Hoenn",
        gen: "3",
        minId: 252,
        maxId: 386,
        starters: [258, 255, 252],
        color: "#60a5fa",
    },
    {
        id: "sinnoh",
        name: "Sinnoh",
        gen: "4",
        minId: 387,
        maxId: 493,
        starters: [387, 390, 393],
        color: "#c084fc",
    },
    {
        id: "unova",
        name: "Unova",
        gen: "5",
        minId: 494,
        maxId: 649,
        starters: [495, 498, 501],
        color: "#10b981",
    },
    {
        id: "kalos",
        name: "Kalos",
        gen: "6",
        minId: 650,
        maxId: 721,
        starters: [650, 653, 656],
        color: "#38bdf8",
    },
    {
        id: "alola",
        name: "Alola",
        gen: "7",
        minId: 722,
        maxId: 809,
        starters: [722, 725, 728],
        color: "#facc15",
    },
    {
        id: "galar",
        name: "Galar",
        gen: "8",
        minId: 810,
        maxId: 898,
        starters: [810, 813, 816],
        color: "#f472b6",
    },
    {
        id: "paldea",
        name: "Paldea",
        gen: "9",
        minId: 899,
        maxId: 1025,
        starters: [906, 909, 912],
        color: "#818cf8",
    },
];

interface RegionBannersProps {
    onSelectRegion: (minId?: number, maxId?: number) => void;
    activeRegion?: string;
}

export function RegionBanners({ onSelectRegion, activeRegion }: RegionBannersProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [dragDistance, setDragDistance] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        setIsDragging(true);
        setDragDistance(0);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };

    const handleMouseLeave = () => setIsDragging(false);
    const handleMouseUp = () => setIsDragging(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Drag speed multiplier

        // Record total drag distance to differentiate between click and drag
        setDragDistance(Math.abs(walk));

        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={cn(
                "flex overflow-x-auto gap-6 pb-6 pt-2 scrollbar-none w-full",
                isDragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"
            )}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            {regions.map((region) => (
                <button
                    key={region.id}
                    onClick={(e) => {
                        // Impedir seleção se estiver apenas arrastando
                        if (dragDistance > 10) {
                            e.preventDefault();
                            return;
                        }

                        if (activeRegion === region.id) {
                            onSelectRegion(undefined, undefined);
                        } else {
                            onSelectRegion(region.minId, region.maxId);
                        }
                    }}
                    className={cn(
                        "relative flex items-center p-6 sm:p-8 overflow-visible rounded-[2rem] sm:rounded-[2.5rem] h-32 sm:h-36 transition-all duration-700 group snap-center shrink-0 w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px]",
                        "bg-white/[0.03] backdrop-blur-md border border-white/[0.05] hover:bg-white/[0.06] active:scale-[0.97]",
                        activeRegion === region.id
                            ? "bg-white/[0.08] shadow-[0_0_50px_rgba(255,255,255,0.05)]"
                            : "opacity-70 hover:opacity-100"
                    )}
                    style={{
                        ringColor: activeRegion === region.id ? region.color : 'transparent'
                    } as React.CSSProperties}
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700 overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]"
                        style={{ backgroundImage: `radial-gradient(${region.color} 1px, transparent 1px)`, backgroundSize: '16px 16px' }}
                    />

                    {/* Dynamic Color Glow */}
                    <div
                        className={cn(
                            "absolute top-[-20%] right-[-10%] w-[60%] h-[120%] blur-[60px] transition-all duration-1000 rounded-full",
                            activeRegion === region.id ? "opacity-20" : "opacity-0 group-hover:opacity-10"
                        )}
                        style={{ backgroundColor: region.color }}
                    />

                    <div className="flex-1 flex flex-col items-start z-10 w-full overflow-hidden shrink-0 pr-16 sm:pr-20">
                        <div className="space-y-1 w-full text-left">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-white/50 transition-colors">
                                Setor {region.gen.padStart(2, '0')}
                            </span>
                            <h4 className={cn(
                                "text-2xl sm:text-3xl font-black italic tracking-tighter transition-all duration-500 truncate w-full",
                                activeRegion === region.id ? "scale-110 translate-x-1" : "group-hover:translate-x-1"
                            )}
                                style={{ color: activeRegion === region.id ? region.color : 'white', transformOrigin: "left" }}>
                                {region.name}
                            </h4>
                        </div>
                        {activeRegion === region.id && (
                            <div className="mt-3 px-2 sm:px-3 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-[7px] sm:text-[8px] font-black uppercase text-red-400 tracking-widest backdrop-blur-sm truncate max-w-full hover:bg-red-500/20 hover:text-red-300 transition-colors flex items-center gap-1">
                                <span>CLIQUE PARA LIMPAR</span>
                            </div>
                        )}
                    </div>

                    {/* Starters Images Container */}
                    <div className="absolute right-0 pr-4 flex -space-x-8 sm:-space-x-6 z-10 transition-all duration-700 h-full items-center justify-end pointer-events-none">
                        {region.starters.map((id, idx) => (
                            <div key={id} className={cn(
                                "relative w-16 h-16 sm:w-20 sm:h-20 transition-all duration-500",
                                idx === 1
                                    ? "z-20 scale-125 translate-y-[-8px] -rotate-6 group-hover:scale-150 group-hover:rotate-0"
                                    : "z-10 opacity-30 blur-[1px] group-hover:opacity-60 group-hover:blur-0 scale-90 translate-y-2"
                            )}>
                                <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Image
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                                    alt={`starter-${id}`}
                                    fill
                                    className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                                    unoptimized
                                />
                            </div>
                        ))}
                    </div>

                    {/* Active State Neon Line */}
                    {activeRegion === region.id && (
                        <div
                            className="absolute bottom-0 left-0 right-0 h-[1px] animate-pulse rounded-b-[1rem]"
                            style={{
                                background: `linear-gradient(90deg, transparent, ${region.color}, transparent)`,
                                boxShadow: `0 0 10px ${region.color}`
                            }}
                        />
                    )}


                </button>
            ))}

            {/* Added spacer to allow last item to scroll into center */}
            <div className="shrink-0 w-[4vw] min-w-[16px]" />
        </div>
    );
}
