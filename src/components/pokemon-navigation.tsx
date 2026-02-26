"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePokemon } from "@/hooks/usePokemonQuery";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PokemonNavigationProps {
    currentId: number;
}

export function PokemonNavigation({ currentId }: PokemonNavigationProps) {
    const prevId = currentId > 1 ? currentId - 1 : null;
    const nextId = currentId < 1025 ? currentId + 1 : null; // Estimativa base do PokeAPI

    const { data: prevPokemon } = usePokemon(prevId ?? "");
    const { data: nextPokemon } = usePokemon(nextId ?? "");

    return (
        <div className="fixed inset-0 pointer-events-none z-[60] flex items-center justify-between px-4 md:px-8">
            <div className="pointer-events-auto">
                <AnimatePresence>
                    {prevId && (
                        <Link href={`/character/${prevId}`}>
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                whileHover={{ x: 5 }}
                                className="group relative flex items-center"
                            >
                                <div className="h-14 w-14 md:h-20 md:w-20 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white/40 group-hover:text-white group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-500 shadow-2xl">
                                    <ChevronLeft className="h-8 w-8 md:h-10 md:w-10 transition-transform group-hover:-translate-x-1" />
                                </div>

                                <div className="absolute left-full ml-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0 pointer-events-none">
                                    <div className="bg-white/5 border border-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl whitespace-nowrap">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-0.5">Previous</div>
                                        <div className="text-xl font-black italic uppercase tracking-tighter text-white">
                                            {prevPokemon?.name || `NO_${prevId.toString().padStart(3, '0')}`}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    )}
                </AnimatePresence>
            </div>

            <div className="pointer-events-auto">
                <AnimatePresence>
                    {nextId && (
                        <Link href={`/character/${nextId}`}>
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                whileHover={{ x: -5 }}
                                className="group relative flex items-center justify-end text-right"
                            >
                                <div className="absolute right-full mr-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[10px] group-hover:translate-x-0 pointer-events-none">
                                    <div className="bg-white/5 border border-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl whitespace-nowrap">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-0.5 text-right">Next</div>
                                        <div className="text-xl font-black italic uppercase tracking-tighter text-white">
                                            {nextPokemon?.name || `NO_${nextId.toString().padStart(3, '0')}`}
                                        </div>
                                    </div>
                                </div>

                                <div className="h-14 w-14 md:h-20 md:w-20 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white/40 group-hover:text-white group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-500 shadow-2xl">
                                    <ChevronRight className="h-8 w-8 md:h-10 md:w-10 transition-transform group-hover:translate-x-1" />
                                </div>
                            </motion.div>
                        </Link>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
